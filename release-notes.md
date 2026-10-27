# TreeFrogUI v1.8.0_t prerelease

## Changes since v1.8.0_s

- **ScummVM:** Added the MIPS libretro core based on [Synaps33's FroggyScummvm fork](https://github.com/Synaps33/FroggyScummvm), with setup instructions, system artwork, and source credit.
- **Audio:** Greatly reduced popping during CPU-heavy gameplay by increasing PicoArch's SF3000 audio prefill; mono downmix is off by default.
- **FrogUI artwork:** Restored missing system icons and background images across the built-in themes, including Neo Geo, Geolith, Sega, DOS, and PC-286.
- **Translations:** Restored missing settings labels, including the full aspect-ratio option, so supported languages no longer show raw translation keys.
- **FrogUI navigation:** Includes the tested pill animation, background prefetch, and system aliases for the newly supported cores.

For a fresh installation, use the full archive and matching `install_first/<device>/` files. To update an existing installation, copy `update.zip` to the SD-card root and reboot.
