<?php

namespace App\Http\Controllers;

use App\Models\ProductGroup;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Tags\Tag;
use function Laravel\Prompts\error;


class TagController extends Controller
{
    public function index(): Response
    {
        $tags = Tag::query()->when(request()->search, function ($query) {
            return $query->where('name', 'like', '%' . request()->search . '%');
        })->paginate(10);

        return Inertia::render('tags/index', [
            'tags' => $tags,
            'search' => request()->search,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|unique:product_categories,name',
            'order_column' => 'required|numeric',
        ]);

        $tag = Tag::create(['name' => $request->get('name')]);
        $tag->order_column = $request->get('order_column');
        $tag->save();

        return Redirect::route('tags.index', [
            'search' => $request->get('name'),
        ]);
    }

    public function destroy(Tag $tag): RedirectResponse
    {
        try {
            $tag->delete();
        } catch (QueryException $exception) {
            error($exception->getMessage());
            return Redirect::route('tags.index')
                ->withErrors($tag->name . __(' is linked to a product.'));
        }

        return Redirect::route('tags.index');
    }

    public function update(Request $request, Tag $tag): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'order_column' => 'required|integer',
        ]);

        $tag->update($validated);

        return Redirect::route('tags.index', [
            'search' => $tag->name,
        ]);
    }
}
