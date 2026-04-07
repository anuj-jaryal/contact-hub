import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CardBoxProps{
    children: React.ReactNode;
    title: string;
    description:string;
}

export function CardBox({children, title, description}:CardBoxProps) {
    return (
        <Card className="rounded-xl">
            <CardHeader className="px-10 pt-8 pb-0 text-center">
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="px-10 py-8">{children}</CardContent>
        </Card>
    );
};
