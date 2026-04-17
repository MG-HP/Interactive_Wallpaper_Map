import { useState } from "react";
import { setExportedMapAsWallpaper } from "../wallpaperClient";

type Props = {
  latestExportPath: string | null;
};

export function SetAsWallpaperButton({ latestExportPath }: Props) {
  const [isApplying, setIsApplying] = useState(false);

  const onSetWallpaper = async () => {
    if (!latestExportPath || isApplying) {
      return;
    }

    const acknowledged = window.confirm(
      [
        "Warning: This will change your Windows desktop wallpaper right now.",
        "Only the current user wallpaper setting will be updated.",
        "No startup/services/system policy settings are changed.",
        "Continue?",
      ].join("\n\n")
    );

    if (!acknowledged) {
      return;
    }

    setIsApplying(true);

    try {
      await setExportedMapAsWallpaper(latestExportPath);
      window.alert("Wallpaper updated successfully.");
    } catch (error) {
      console.error("Failed to set wallpaper", error);
      window.alert(
        "Could not set wallpaper. Confirm you are on Windows and the export file still exists."
      );
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <button disabled={!latestExportPath || isApplying} onClick={onSetWallpaper}>
      {isApplying ? "Applying wallpaper..." : "Set as Windows wallpaper"}
    </button>
  );
}
