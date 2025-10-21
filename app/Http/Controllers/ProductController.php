<?php

namespace App\Http\Controllers;

use App\Enums\ProductStatus;
use App\Http\Requests\Product\ProductStoreRequest;
use App\Http\Requests\Product\ProductUpdateRequest;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductGroup;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Tags\Tag;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $search = request('search');

        $products = Product::when($search, function ($query, $search) {
            $query->whereAny(['name', 'sku', 'price'], 'like', "%{$search}%");
        })->paginate(10);

        return Inertia::render('products/index', [
            'products' => $products,
            'search' => $search,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductStoreRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $product = Product::create($validated);

        return redirect()->route('products.edit', $product->id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product): Response
    {
        $categories = ProductCategory::all(['id', 'name'])->map(function ($category) {
            return [
                'value' => $category->id,
                'label' => $category->name,
            ];
        });
        $groups = ProductGroup::all(['id', 'name'])->map(function ($group) {
            return [
                'value' => $group->id,
                'label' => $group->name,
            ];
        });

        $statuses = collect(ProductStatus::cases())->map(function ($status) {
            return [
                'value' => $status->value,
                'label' => $status->name,
            ];
        });

        $tags = Tag::all(['id', 'name'])->map(function ($tag) {
            return [
                'value' => $tag->name,
                'label' => $tag->name,
            ];
        });

        $product->load('variants', 'tags');
        $product->append('gallery');

        return Inertia::render('products/edit', [
            'product' => $product,
            'categories' => $categories,
            'groups' => $groups,
            'statuses' => $statuses,
            'tags' => $tags,
        ]);
    }

    /**
     * Update the specified resource in storage.
     * @throws ValidationException
     */
    public function update(ProductUpdateRequest $request, Product $product): RedirectResponse
    {
        $validated = $request->validated();
        $product->update($validated);

        $this->updateGallery($request, $product);

        if ($request->hasFile('media_files')) {
            foreach ($request->file('media_files') as $file) {
                try {
                    $product
                        ->addMedia($file)
                        ->toMediaCollection('gallery');
                } catch (FileDoesNotExist $e) {
                    throw ValidationException::withMessages([
                        'media_files' => 'File does not exist.',
                    ]);
                } catch (FileIsTooBig $e) {
                    throw ValidationException::withMessages([
                        'media_files' => 'File size is too big.',
                    ]);
                }
            }
        }

        if ($request->input(['newVariants'])){
            $validated = $request->validate([
                'newVariants' => ['nullable', 'array', 'min:1'],
                'newVariants.*.sku' => ['required', 'string', 'max:255'],
                'newVariants.*.name' => ['required', 'string', 'max:255'],
                'newVariants.*.option' => ['required', 'string', 'max:255'],
                'newVariants.*.price' => ['required', 'numeric', 'min:0'],
                'newVariants.*.material_id' => ['required', 'string', 'max:255'],
            ]);

            foreach ($validated['newVariants'] as $variantData) {
                $product->variants()->create($variantData);
            }
        }

        if ($request->input('tags')) {
            $product->syncTags($request->input('tags'));
        }

        return redirect()->route('products.edit', $product)->with('success');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return redirect()->route('products.index');
    }

    /**
     * @param ProductUpdateRequest $request
     * @param Product $product
     * @return void
     */
    protected function updateGallery(ProductUpdateRequest $request, Product $product): void
    {
        $newOrder = $request->input('media_order', []);

        if (!empty($newOrder)) {
            Media::setNewOrder($newOrder);

            $keep = $product->media()
                ->where('collection_name', 'gallery')
                ->whereIn('id', $newOrder)
                ->get();

            $product->clearMediaCollectionExcept('gallery', $keep);
        } else {
            $product->clearMediaCollection('gallery');
        }
    }

    public function spareParts() : Response
    {
        $search = request('search');
        $products = Product::withAnyTags(['Spare parts'])
            ->when($search, function ($query, $search) {
                $query->whereAny(['name', 'sku',], 'like', "%{$search}%");
            })
            ->with('variants', 'tags')
            ->get();

        return Inertia::render('products/collections', [
            'products' => $products,
            'search' => $search,
            'title' => 'SPARE PARTS CATALOGUE',
            'description' => 'Genuine Meze Audio headphone replacement parts',
        ]);
    }

    public function accessories() : Response
    {
        $search = request('search');
        $products = Product::withAnyTags(['Accessories'])
            ->when($search, function ($query, $search) {
                $query->whereAny(['name', 'sku',], 'like', "%{$search}%");
            })
            ->with('variants', 'tags')
            ->get();

        return Inertia::render('products/collections', [
            'products' => $products,
            'search' => $search,
            'title' => 'ACCESSORIES CATALOGUE',
            'description' => 'Elevate your Meze Audio experience',
        ]);
    }
}
