export default function CodeExample({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <pre style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
      <code
        className="text-xs leading-tight "
        style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
      >
        {children}
      </code>
    </pre>
  );
}
