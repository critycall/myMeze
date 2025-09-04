import { PaginationEllipsis, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { JSX } from 'react';

export const generatePaginationLinks = (currentPage: number, links: { url: string; label: string; active: boolean }[], pageQuery?: string) => {
    const pages: JSX.Element[] = [];

    for (let i = 1; i < links.length - 1; i++) {
        if (links[i].url) {
            pages.push(
                <PaginationItem key={i}>
                    <PaginationLink href={links[i].url + pageQuery} isActive={links[i].active} aria-current={i === currentPage ? 'page' : undefined}>
                        {links[i].label}
                    </PaginationLink>
                </PaginationItem>,
            );
        } else {
            pages.push(<PaginationEllipsis key={i} />);
        }
    }
    return pages;
};
