import { Card, Skeleton } from "@nextui-org/react";

export default function Loading() {
  return (
    <Card className="flex mb-5 w-[800px] space-y-5 p-4" radius="lg">
    <Skeleton className="rounded-lg">
      <div className="h-56 rounded-lg bg-default-300"></div>
    </Skeleton>
  </Card>
  );
}
