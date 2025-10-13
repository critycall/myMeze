import React from "react";
import { ContentBlock } from '@/types';
import ResponsiveImage from '@/components/ui/image';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';



function BlockContent({ block }: { block: ContentBlock }) {
    return (
        <div className="">
           <div className="relative md:hidden bg-secondary">
               {block.background && (
                   <ResponsiveImage media={block.mobileBackground} />
               )}

               <div className="absolute bottom-0 w-full text-primary-foreground from-black from-40% bg-gradient-to-t">

                   {(block.title || block.body) && (
                       <div className="p-3">
                           {block.title && (
                               <h2 className="text-xl xl:text-5xl text-center font-bold">{block.title}</h2>
                           )}
                           {block.body && <p className="text-sm xl:text-xl text-center font-normal mt-2">{block.body}</p>}

                           {block.action && (
                               <div className="flex justify-center mt-2">
                                   <Link href={block.action} >
                                       <Button type="button" size="lg"> { block.action_name}</Button>
                                   </Link>
                               </div>
                           )}
                       </div>
                   )}

               </div>
           </div>
            <div className="hidden md:block relative">
                {block.background && (
                    <ResponsiveImage media={block.background} />
                )}

                <div className="absolute left-0 bottom-0 w-full text-primary-foreground from-black from-60% bg-gradient-to-t">

                    {(block.title || block.body) && (
                        <div className="p-6 ml-5 mb-5">
                            {block.title && (
                                <h2 className="text-2xl max-w-xl font-bold">{block.title}</h2>
                            )}
                            {block.body && <p className="text-lg font-normal my-3 w-1/2">{block.body}</p>}

                            {block.action && (
                                <div className="mt-2">
                                    <Link href={block.action} >
                                        <Button type="button" size="lg"> { block.action_name}</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default BlockContent;
