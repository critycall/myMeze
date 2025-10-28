import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import ResponsiveImage from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import ManagementLayout from '@/layouts/product/layout';
import { BreadcrumbItem, ContentBlock, Option } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

import { MultiSelect } from '@/components/ui/multi-select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products contentBlocks',
        href: '/product-contentBlocks',
    },
];
export default function Edit({ contentBlock, tags }: { contentBlock: ContentBlock; tags: Option[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product groups" />
            <ManagementLayout>
                <div className="max-w-3xl space-y-6">
                    <HeadingSmall title="Content block" description="This are used in the app by key, you can update the text or change the image " />
                    <div className="mt-2">
                        <Form
                            options={{
                                preserveScroll: true,
                                preserveState: false,
                            }}
                            method="POST"
                            onSuccess={() => {
                                toast.success('Product content block has been updated successfully.');
                            }}
                            resetOnSuccess
                            action={route('content-blocks.update', contentBlock.id)}
                            className="space-y-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <input name="_method" value="patch" type="hidden" />
                                    <div className="grid gap-2">
                                        <Label htmlFor="Title">Title</Label>
                                        <Input
                                            defaultValue={contentBlock.title}
                                            type="text"
                                            name="title"
                                            autoComplete="off"
                                            className="mt-1 block w-full"
                                        />
                                        <InputError message={errors.title} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="action">Action</Label>
                                        <Input
                                            defaultValue={contentBlock.action}
                                            type="text"
                                            name="action"
                                            autoComplete="off"
                                            className="mt-1 block w-full"
                                        />
                                        <InputError message={errors.action} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="actionName">Action name</Label>
                                        <Input
                                            defaultValue={contentBlock.action_name}
                                            type="text"
                                            name="action_name"
                                            autoComplete="off"
                                            className="mt-1 block w-full"
                                        />
                                        <InputError message={errors.action_name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="actionName">Video URL</Label>
                                        <Input
                                            defaultValue={contentBlock.video_url}
                                            type="text"
                                            name="video_url"
                                            autoComplete="off"
                                            className="mt-1 block w-full"
                                        />
                                        <InputError message={errors.video_url} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Tags</Label>
                                        <MultiSelect name="tags" options={tags} defaultValue={contentBlock.tags.map((tag) => tag.name['en'])} />
                                        <InputError className="mt-2" message={errors.description} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="key">Key</Label>
                                        <Input
                                            id="key"
                                            defaultValue={contentBlock.key}
                                            type="text"
                                            name="key"
                                            autoComplete="off"
                                            className="mt-1 block w-full"
                                        />
                                        <InputError message={errors.key} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="position">Details</Label>
                                        <Textarea defaultValue={contentBlock.body ?? ''} id="body" name="body" className="mt-1 block w-full border" />
                                        <InputError message={errors.body} className="mt-2" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="background">Background</Label>
                                        <Input type="file" name="background" accept="image/*" />
                                        <InputError message={errors.background} className="mt-2" />

                                        {contentBlock.background && (
                                            <div className="mt-2 h-96">
                                                <ResponsiveImage media={contentBlock.background} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="mobile_background">Mobile background</Label>
                                        <Input type="file" name="mobile_background" accept="image/*" />
                                        <InputError message={errors.mobile_background} className="mt-2" />

                                        {contentBlock.mobileBackground && (
                                            <div className="mt-2">
                                                <ResponsiveImage className="max-h-60 w-fit" media={contentBlock.mobileBackground} />
                                            </div>
                                        )}
                                    </div>

                                    <Button type="submit" disabled={processing}>
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                        Update block
                                    </Button>
                                </>
                            )}
                        </Form>
                    </div>
                </div>
            </ManagementLayout>
        </AppLayout>
    );
}
