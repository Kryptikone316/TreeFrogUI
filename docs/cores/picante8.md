# Picante8 / PICO-8

Picante8 is the MustardOS PICO-8 libretro core integrated into TreeFrogUI.

## Installation

Place PICO-8 carts in:

```text
roms/picante8/
```

Supported formats:

- `.p8` source carts
- `.p8.png` cartridge images

Open **PICO-8 - Picante8** in the system list and select a cart. The core is separate from the existing Fake-08 (`pico8`) and Retro8 (`retro8`) systems.

The release includes these example carts:

- `Celeste Classic.p8.png`
- `Legend of Mario.p8.png`
- `CARDOOM.p8.png`
- `Froggy Knight.p8.png`

Picante8 stores libretro save data through the normal TreeFrogUI/PicoArch save path. No BIOS or additional runtime files are required.

Upstream: [MustardOS/picante8](https://github.com/MustardOS/picante8)
