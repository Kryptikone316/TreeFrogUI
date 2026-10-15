# Ports

Standalone and game-specific ports live under one **Ports** entry in the Games
view. The Ports root shows only `.sh` launchers (without the extension); port
data folders stay hidden:

```text
roms/ports/
├── <Port name>.sh
├── .res/
│   └── <Port name>.png    # boxart for that launcher
└── <port>/                # hidden data and saves
```

FrogUI renders each launcher's floppy-disk box art in the active theme's
standard artwork panel. Data files remain in `roms/ports/<port>/`.

Launchers share one required-file checker. If port data is missing, FrogUI
shows the missing filenames and a QR code linking to that port's setup guide;
the game is not started.

On first boot after updating, TreeFrogUI migrates supported old port folders
from `roms/<port>/` into `roms/ports/<port>/`, preserving user files and keeping
release-provided files authoritative on name conflicts. The old folder is
removed only after its contents merge successfully, then stays hidden from the
Games list.

Current guides:

- [Diablo 1](diablo.md)
- [Duke Nukem 3D](duke3d.md)
- [Minecraft Pocket Edition](mcpe.md)
- [Captain Claw](openclaw.md)
- [Undertale](undertale.md)
- [ClassiCube](classicube.md)
