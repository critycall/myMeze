<?php

namespace App\Http\Controllers;

use App\Models\ContentBlock;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Tags\Tag;

class ContentBlockController extends Controller
{
    public function index(): Response
    {
        $contentBlocks = ContentBlock::when(request('search'), function ($query, $search) {
            $query->whereAny(['key', 'description', 'title'], 'like', '%' . $search . '%');
        })->paginate(10);

        return Inertia::render('content-blocks/index', [
            'search' => request('search'),
            'contentBlocks' => $contentBlocks,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'key' => 'required|string|unique:content_blocks,key|regex:/^[a-z]+(-[a-z]+)*$/',
            'title' => 'required|string',
            'description' => 'nullable|string',
        ]);

        $validated['is_active'] = $request->boolean('is_active');

        $contentBlock = ContentBlock::create($validated);

        return redirect()->route('content-blocks.edit', $contentBlock->id);
    }

    public function edit(ContentBlock $contentBlock): Response
    {
        $tags = Tag::all(['id', 'name'])->map(function ($tag) {
            return [
                'value' => $tag->name,
                'label' => $tag->name,
            ];
        });

        $contentBlock->load('tags');

        return Inertia::render('content-blocks/edit', [
            'contentBlock' => $contentBlock,
            'tags' => $tags,
        ]);
    }

    public function destroy(ContentBlock $contentBlock): RedirectResponse
    {
        $contentBlock->delete();

        return redirect()->route('content-blocks.index');
    }

    public function update(Request $request, ContentBlock $contentBlock): RedirectResponse
    {
        $validated = $request->validate([
            'key' => ['string', 'required', Rule::unique('content_blocks', 'key')->ignore($contentBlock->id)],
            'title' => 'required|string',
            'body' => 'nullable|string',
            'action' => 'nullable|string',
            'action_name' => 'nullable|string',
            'video_url' => 'nullable|string',
        ]);

        $contentBlock->update($validated);

        if ($request->hasFile('background')) {
            $contentBlock->addMediaFromRequest('background')
                ->toMediaCollection('background');
        }

        if ($request->hasFile('mobile_background')) {
            $contentBlock->addMediaFromRequest('mobile_background')
                ->toMediaCollection('mobileBackground');
        }

        if ($request->input('tags')) {
            $contentBlock->syncTags($request->input('tags'));
        }

        return redirect()->route('content-blocks.edit', $contentBlock);
    }
}
