import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FileSelect({
  format,
  setFileFormat,
}: {
  format: string;
  setFileFormat: (format: string) => void;
}) {
  return (
    <Select
      onValueChange={(value) => setFileFormat(value)}
      defaultValue={format}
    >
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Format" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="srt">Srt</SelectItem>
        <SelectItem value="text">Text</SelectItem>
        <SelectItem value="vtt">Vtt</SelectItem>
      </SelectContent>
    </Select>
  );
}
