/*
 * hwprobe - minimal static hardware probe for SF3500-family devices.
 *
 * Dumps /proc/cpuinfo, /proc/meminfo, /proc/version, runs a fixed-size
 * CPU benchmark (real iterations/sec - cpufreq sysfs is absent on this
 * device, BogoMIPS alone isn't a safe clock-speed conversion), and probes
 * actual single-process usable RAM by allocating and TOUCHING 1MB chunks
 * until the kernel OOM-killer intervenes. Linux overcommits: malloc()
 * succeeding proves nothing - only writing to the pages forces the kernel
 * to actually back them, which is the point where you learn the real
 * ceiling. Progress is reported (and immediately flushed) every 16MB so
 * an OOM-kill - which delivers SIGKILL, discarding anything still sitting
 * in a libc stdio buffer - only loses the last <16MB of granularity
 * instead of the whole probe's output.
 *
 * Built fully STATIC on purpose: this device's on-device glibc (2.20) is
 * far older than a from-scratch cross toolchain's default glibc, and a
 * dynamically-linked binary built against the wrong one fails outright
 * (missing GLIBC_* symbol versions) before ever reaching main(). Static
 * linking sidesteps that gap entirely - hwprobe never touches the
 * device's runtime libc, so it works regardless of which toolchain built
 * it, which is exactly what you want from a tool whose whole job is
 * characterizing a device you don't fully trust yet.
 *
 * Output goes to stdout - redirect to a file from the caller
 * (`hwprobe > hwprobe.txt`), same convention as every other SF3500
 * diagnostic in this project.
 */
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

static void dump_file(const char *path) {
    printf("=== %s ===\n", path);
    FILE *f = fopen(path, "r");
    if (!f) {
        printf("(failed to open)\n\n");
        fflush(stdout);
        return;
    }
    char line[512];
    while (fgets(line, sizeof(line), f)) fputs(line, stdout);
    fclose(f);
    printf("\n");
    fflush(stdout); /* before the next section, not just at the very end -
                      * see header comment on why this matters under SIGKILL */
}

static void cpu_bench(void) {
    printf("=== cpu_bench ===\n");
    const long iterations = 200000000L;
    long acc_i = 0;
    double acc_f = 0.0;
    struct timespec t0, t1;

    clock_gettime(CLOCK_MONOTONIC, &t0);
    for (long i = 0; i < iterations; i++) {
        acc_i += i % 7;
        acc_f += (double)(i % 13) * 0.5;
    }
    clock_gettime(CLOCK_MONOTONIC, &t1);

    double elapsed = (double)(t1.tv_sec - t0.tv_sec) +
                      (double)(t1.tv_nsec - t0.tv_nsec) / 1e9;

    printf("iterations: %ld\n", iterations);
    printf("elapsed_sec: %.3f\n", elapsed);
    printf("iters_per_sec: %.0f\n", elapsed > 0 ? (double)iterations / elapsed : 0.0);
    /* acc_i/acc_f only exist so the compiler can't optimize the whole loop
     * away as dead code - the real output is the timing above */
    printf("(sink, ignore) acc_i=%ld acc_f=%.3f\n\n", acc_i, acc_f);
    fflush(stdout);
}

#define MEM_CHUNK_MB    1
#define MEM_REPORT_MB   16
#define MEM_CAP_MB      4096 /* generous safety bound, not expected to be reached */

static void mem_probe(void) {
    printf("=== mem_probe ===\n");
    fflush(stdout);

    size_t chunk_bytes = (size_t)MEM_CHUNK_MB * 1024 * 1024;
    int touched_mb = 0;

    for (int i = 0; i < MEM_CAP_MB / MEM_CHUNK_MB; i++) {
        unsigned char *p = malloc(chunk_bytes);
        if (!p) {
            printf("malloc_failed_at_mb: %d\n", touched_mb);
            fflush(stdout);
            return;
        }
        /* write every page, not just byte 0 - this is the step that
         * actually costs real RAM under overcommit, not the malloc() */
        for (size_t off = 0; off < chunk_bytes; off += 4096) {
            p[off] = (unsigned char)off;
        }
        touched_mb += MEM_CHUNK_MB;
        if (touched_mb % MEM_REPORT_MB == 0) {
            printf("touched_mb_so_far: %d\n", touched_mb);
            fflush(stdout);
        }
        /* chunks are intentionally never freed - the whole point is
         * accumulating real resident memory until something gives */
    }
    printf("reached_cap_mb: %d\n", touched_mb);
    fflush(stdout);
}

int main(void) {
    dump_file("/proc/cpuinfo");
    dump_file("/proc/meminfo");
    dump_file("/proc/version");
    cpu_bench();
    mem_probe();
    printf("=== done ===\n");
    fflush(stdout);
    return 0;
}
