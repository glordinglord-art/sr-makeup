export interface PreferredLook {
  title: string;
  imageUrl?: string;
}

const LOOK_MARKER = "[LOOK_REF]";

export function encodeNotesWithLook(
  notes: string,
  look?: PreferredLook | null
): string {
  const trimmedNotes = notes.trim();
  if (!look?.title) return trimmedNotes;

  const refLine = look.imageUrl
    ? `${LOOK_MARKER} ${look.title} | ${look.imageUrl}`
    : `${LOOK_MARKER} ${look.title}`;

  return trimmedNotes ? `${refLine}\n${trimmedNotes}` : refLine;
}

export function parseLookFromNotes(notes?: string | null): {
  look: PreferredLook | null;
  cleanNotes: string;
} {
  if (!notes) return { look: null, cleanNotes: "" };

  const lines = notes.split("\n");
  const markerIndex = lines.findIndex((line) => line.startsWith(LOOK_MARKER));
  if (markerIndex === -1) {
    return { look: null, cleanNotes: notes };
  }

  const rawRef = lines[markerIndex].replace(LOOK_MARKER, "").trim();
  const [titlePart, imagePart] = rawRef.split("|").map((part) => part.trim());
  const remaining = lines
    .filter((_, idx) => idx !== markerIndex)
    .join("\n")
    .trim();

  return {
    look: titlePart
      ? { title: titlePart, imageUrl: imagePart || undefined }
      : null,
    cleanNotes: remaining,
  };
}
