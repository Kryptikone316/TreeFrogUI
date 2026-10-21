#!/bin/sh
# Build hwprobe — a minimal static hardware-probe binary for SF3500-family
# devices (cpuinfo/meminfo/version dump, CPU benchmark, real single-process
# memory ceiling). Output: hwprobe → copy to the SD card and run it, e.g.
# from zhijack.sh or by hand, redirecting stdout to a file.
set -e
cd "$(dirname "$0")"

MIPS="$HOME/sf3000-work/sf3000toolchain/mipsel-buildroot-linux-gnu_sdk-buildroot/opt/ext-toolchain/bin/mips-mti-linux-gnu-"
SYSROOT="$HOME/sf3000-work/sf3000toolchain/mipsel-buildroot-linux-gnu_sdk-buildroot/mipsel-buildroot-linux-gnu/sysroot"
CC="${MIPS}gcc"

[ -x "${CC}" ] || { echo "toolchain not found: ${CC}"; exit 1; }

CFLAGS="-mips32r2 -march=mips32r2 -mtune=74kc -mfp32 -mhard-float -EL \
        --sysroot=$SYSROOT -Wall -O2 -DNDEBUG"

# Fully static - unlike tfhijack.c/nosleep.c (which run inside a process
# that already has libc loaded), hwprobe is a standalone binary that must
# run correctly regardless of which glibc version is actually on the SD
# card at the time, so it never touches the device's runtime libc at all.
$CC $CFLAGS -static -o hwprobe hwprobe.c

"${MIPS}strip" hwprobe 2>/dev/null || true
ls -la hwprobe
file hwprobe
"${MIPS}readelf" -d hwprobe 2>&1 | grep -q NEEDED && \
    echo "WARNING: dynamic NEEDED entries found - not actually static" || \
    echo "confirmed static (no NEEDED entries)"
