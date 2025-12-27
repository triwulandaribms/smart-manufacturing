import "./StatusBadge.css";

export default function StatusBadge({ status }) {
  const normalized = status || "Unknown";

  return (
    <span className={`status-badge ${normalized.toLowerCase()}`}>
      {normalized}
    </span>
  );
}
