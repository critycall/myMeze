'use client';


import { useEffect, useId, useRef, useState } from 'react';
import { Option } from '@/types';
import { Tags, TagsContent, TagsEmpty, TagsGroup, TagsInput, TagsItem, TagsList, TagsTrigger, TagsValue } from '../../../../components/ui/shadcn-io/tags';

interface MultiSelectProps {
    name: string;
    id?: string;
    options: Option[];
    defaultValue?: string[];
    placeholder?: string;
    searchable?: boolean;
    disabled?: boolean;
    className?: string;
}

export function MultiSelect({
                                name,
                                id,
                                options,
                                defaultValue = [],
                                placeholder = 'Select options...',
                                searchable = true,
                                disabled = false,
                                className = '',
                            }: MultiSelectProps) {

    const generatedId = useId();
    const inputId = id || generatedId;
    const [selected, setSelected] = useState<string[]>(defaultValue);
    const [search, setSearch] = useState('');
    const hiddenInputRef = useRef<HTMLInputElement | null>(null);


    useEffect(() => {
        if (hiddenInputRef.current) {
            const event = new Event('change', { bubbles: true });
            hiddenInputRef.current.dispatchEvent(event);
        }
    }, [selected]);

    const toggle = (val: string) => {
        setSelected((prev) =>
            prev.includes(val)
                ? prev.filter((v) => v !== val)
                : [...prev, val]
        );
    };

    const filtered = searchable
        ? options.filter((o) =>
            o.label.toLowerCase().includes(search.toLowerCase())
        )
        : options;

    return (
        <div className={`relative ${className}`}>
            <Tags className="w-full">
                <TagsTrigger disabled={disabled} className="bg-secondary">
                    {selected.length > 0 ? (
                        selected.map((val) => (
                            <TagsValue key={val} onRemove={() => toggle(val)}>
                                {options.find((o) => o.value === val)?.label ?? val}
                            </TagsValue>
                        ))
                    ) : (
                        <span className="text-muted-foreground pl-1">{placeholder}</span>
                    )}
                </TagsTrigger>

                <TagsContent>
                    {searchable && (
                        <TagsInput
                            value={search}
                            onValueChange={setSearch}
                            placeholder="Search..."
                            disabled={disabled}
                        />
                    )}
                    <TagsList>
                        {filtered.length === 0 ? (
                            <TagsEmpty>No options found.</TagsEmpty>
                        ) : (
                            <TagsGroup>
                                {filtered.map((opt) => {
                                    const isSelected = selected.includes(opt.value);
                                    return (
                                        <TagsItem
                                            key={opt.value}
                                            onSelect={() => toggle(opt.value)}
                                            value={opt.value}
                                            className={`flex items-center justify-between cursor-pointer ${
                                                isSelected ? 'bg-primary/10 font-medium' : ''
                                            }`}
                                        >
                                            {opt.label}
                                            {isSelected && (
                                                <span className="ml-2 text-primary text-xs">✓</span>
                                            )}
                                        </TagsItem>
                                    );
                                })}
                            </TagsGroup>
                        )}
                    </TagsList>
                </TagsContent>
            </Tags>

            {/* Single hidden input to trigger form change */}
            <input
                ref={hiddenInputRef}
                type="hidden"
                id={inputId}
                name={name}
                value={selected.join(',')}
                disabled={disabled}
            />

            {/* Hidden array inputs for proper backend submission */}
            {selected.map((val) => (
                <input key={val} type="hidden" name={`${name}[]`} value={val} />
            ))}
        </div>
    );
}
