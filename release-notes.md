# TreeFrogUI v1.7.0_a prerelease

## What's new

- Added Picante8 as a separate PICO-8 libretro system. It supports `.p8` and `.p8.png` carts in `roms/picante8/`, with its own system icons and normal libretro save handling. See [the setup guide](docs/cores/picante8.md).
- Restored per-port launcher defaults and friendly system names for the supported standalone and libretro ports.
- Updated the bundled DSperate Nintendo DS package and fixed Diablo 1 display orientation on SF3000-family devices. The Diablo launcher now checks for the required `DIABDAT.MPQ` game data.
- Added experimental Duke Nukem 3D support through the SF3000-family libretro core from [Synaps33/FroggyDuke](https://github.com/Synaps33/FroggyDuke). Install legally obtained `DUKE3D.GRP` and `DUKE.RTS` files in `roms/ports/duke3d/`, then launch **Duke Nukem 3D** from **Games → Ports**. See [the Duke setup guide](docs/cores/duke3d.md).
- Fixed launching a second game after exiting the first. The launcher now catches FrogUI requests from PicoArch's reused frontend process.
- Tuned Duke audio pacing in the current local build. Hardware audio quality has not yet been verified; this is not a confirmed audio fix.

Thanks to [Synaps33](https://github.com/Synaps33) for the original FroggyDuke port, and to the [MustardOS Picante8](https://github.com/MustardOS/picante8) contributors for the PICO-8 core.

This is a prerelease for testing. For a fresh installation, use the full archive and the matching `install_first/<device>/` files. To update an existing installation, copy `update.zip` to the SD-card root and reboot. Back up the card first.
