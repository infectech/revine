import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SIZE_CHART } from "@/lib/config";

export default function SizeChart() {
  return (
    <Accordion defaultValue={["size-chart"]}>
      <AccordionItem value="size-chart">
        <AccordionTrigger className="text-sm">Size Chart</AccordionTrigger>
        <AccordionContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Size</TableHead>
                <TableHead>Chest (in)</TableHead>
                <TableHead>Length (in)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SIZE_CHART.map((row) => (
                <TableRow key={row.size}>
                  <TableCell className="font-medium">{row.size}</TableCell>
                  <TableCell>{row.chest}</TableCell>
                  <TableCell>{row.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="mt-2 text-xs text-muted-foreground">
            All measurements are in inches.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
