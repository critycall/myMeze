import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { generatePaginationLinks } from '@/lib/generate-pagination-links';
import { cn } from '@/lib/utils';
import { PaginatedResponse } from '@/types';

type TablePaginationProps<T> = {
    resource: PaginatedResponse<T>;
};

export function TablePagination<T>({ resource }: TablePaginationProps<T>) {
    const params = new URLSearchParams(window.location.search);
    params.delete('page');
    const pageQuery = params.size ?'&' + params.toString() : '';

    return (
        <div>
            {resource.last_page > 1 && (
                <Pagination>
                    <PaginationContent className="flex w-full justify-center">
                        <div>
                            <PaginationItem>
                                <PaginationPrevious
                                    className={cn(resource.current_page === 1 && 'pointer-events-none text-muted-foreground')}
                                    href={resource.prev_page_url ? resource.prev_page_url + pageQuery : '#'}
                                />
                            </PaginationItem>
                        </div>
                        <div className="hidden md:flex">
                            {generatePaginationLinks(resource.current_page, resource.links, pageQuery)}
                        </div>
                        <div className="md:hidden">
                            Page {resource.current_page} of {resource.last_page}
                        </div>
                        <div>
                            <PaginationItem>
                                <PaginationNext
                                    className={cn(resource.current_page === resource.last_page && 'pointer-events-none text-muted-foreground')}

                                    href={resource.next_page_url ? resource.next_page_url + pageQuery : '#'}
                                />
                            </PaginationItem>
                        </div>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}
