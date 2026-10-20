#include <arpa/inet.h>
#include <fcntl.h>
#include <stdint.h>
#include <string.h>
#include <sys/mman.h>
#include <unistd.h>

static int r36_device(void)
{
    char env[512];
    int fd = open("/tmp/tfdevice.env", O_RDONLY);
    if (fd < 0) return 0;
    ssize_t n = read(fd, env, sizeof(env) - 1);
    close(fd);
    if (n <= 0) return 0;
    env[n] = '\0';

    for (char *line = env; line && *line;) {
        char *end = line;
        while (*end && *end != '\n' && *end != '\r') end++;
        if ((size_t)(end - line) == sizeof("TF_DEVICE=R36SX") - 1 &&
            !memcmp(line, "TF_DEVICE=R36SX", sizeof("TF_DEVICE=R36SX") - 1))
            return 1;
        line = *end ? end + 1 : end;
    }
    return 0;
}

int main(void)
{
    uint32_t cell;
    if (!r36_device()) return 0;

    int fd = open("/proc/device-tree/panel/speaker-output", O_RDONLY);
    if (fd < 0 || read(fd, &cell, sizeof(cell)) != sizeof(cell)) {
        if (fd >= 0) close(fd);
        return 0;
    }
    close(fd);
    uint32_t pin = ntohl(cell);
    if (pin > 31) return 0;

    fd = open("/dev/mem", O_RDWR | O_SYNC);
    if (fd < 0) return 0;
    void *mapping = mmap(NULL, 0x2020, PROT_READ | PROT_WRITE, MAP_SHARED,
                         fd, 0x18800000);
    close(fd);
    if (mapping == MAP_FAILED) return 0;

    volatile uint32_t *gpio_l = (volatile uint32_t *)((char *)mapping + 0x44);
    uint32_t bit = 1u << pin;
    gpio_l[5] |= bit;
    gpio_l[4] &= ~bit;
    munmap(mapping, 0x2020);
    return 0;
}
