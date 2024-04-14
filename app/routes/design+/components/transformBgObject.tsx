export default function TransformBg({ value }: { value: string }) {
  const parts = value.split(" ");
  const background = parts[0].replace("bg-col-", "bg-");
  const gradient = parts[1].replace("bg-", "");
  const backgroundCombo = String(`${background}-${gradient}`);

  return backgroundCombo;

  //   // Function to transform the input value
  //   const transformBgValue = (value: string) => {
  //     const parts = value.split(" ");
  //     const colPart = parts.find((part) => part.startsWith("bg-col-"));
  //     const numericPartMatch = colPart ? colPart.match(/\d+/) : null;
  //     const numericPart = numericPartMatch ? numericPartMatch[0] : "default";
  //     const gradientPart = parts.find((part) => part.startsWith("bg-linear"));

  //     if (!gradientPart) return ""; // Return an empty string or some fallback value if gradient part is not found

  //     const gradientNameAndOpacity = gradientPart.substring(3);
  //     return `bg-${numericPart}-${gradientNameAndOpacity}`;
  //   };

  //   // Transform the passed value
  //   const transformedValue = transformBgValue(value);

  //   // Render the transformed value
  //   return <>{transformedValue}</>;
}
