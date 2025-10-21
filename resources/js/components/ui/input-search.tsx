import { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
    onSearch?: (value: string) => void;
}

export const InputSearch = ({ onSearch, ...props }: InputSearchProps) => {


    return (
        <div className="relative w-full">
            <Input {...props} className="pr-10"></Input>
            <Button
                type="submit"
                variant="outline"
                className="absolute hover:cursor-pointer rounded-l-none rounded-r-md right-0 top-1/2 -translate-y-1/2"
                onClick={() => onSearch && onSearch((document.querySelector("input") as HTMLInputElement)?.value || "")}
            >
                <Search className="h-4 w-4" />
            </Button>
        </div>
    );
};
