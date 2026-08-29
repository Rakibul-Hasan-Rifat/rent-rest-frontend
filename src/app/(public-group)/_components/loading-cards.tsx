import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingCards = () => {
    return (
        <Card className="w-full">
            <CardContent>
                <Skeleton className="aspect-video" />
            </CardContent>
        </Card>
    )
}

export default LoadingCards;