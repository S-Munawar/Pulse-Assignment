"use client";

export function AvatarStack({ assignees }: { assignees: { initials: string; color: string }[] }) {
  const shown = assignees.slice(0, 3);
  const overflow = assignees.length - shown.length;
  return (
    <div className="flex items-center">
      {shown.map((a, i) => (
        <div
          key={i}
          className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
          style={{ background: a.color, marginLeft: i === 0 ? 0 : -6, zIndex: shown.length - i }}
          title={a.initials}
        >
          {a.initials}
        </div>
      ))}
      {overflow > 0 && (
        <div
          className="w-6 h-6 rounded-full border-2 border-white bg-hover flex items-center justify-center text-xs font-semibold text-t2 flex-shrink-0"
          style={{ marginLeft: -6 }}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
