---
title: "Vue 3 ref vs. reactive: When to Use Each"
description: "When to use ref or reactive in Vue 3: examples of replacing object state, updating proxy properties, and keeping destructured values reactive with toRefs."
heroImageUrl: https://images.unsplash.com/photo-1640158615573-cd28feb1bf4e?fit=crop&w=800&h=418&fm=avif
imageThumbnail: https://images.unsplash.com/photo-1640158615573-cd28feb1bf4e?fit=crop&w=80&h=80&fm=avif
pubDate: "2024-07-02T08:22:26+07:00"
updatedDate: "2026-11-20"
---

In Vue 3's Composition API, start with `ref` for most state. It works for both primitives and objects, and you can replace its value without losing reactivity. Use `reactive` when you want to keep one object and update its properties in place.

## Use `ref` for values you might replace

In JavaScript, read and write a ref through `.value`. Vue templates unwrap top-level refs, so a template can display `{{ count }}` without `.value`.

```js
import { ref } from "vue";

const count = ref(0);
count.value++;
```

Refs can hold objects and arrays, too. Vue makes an object held by a normal `ref` deeply reactive. You can update a property or replace the object entirely:

```js
import { ref } from "vue";

const filters = ref({ search: "", page: 1 });

filters.value.page++;
filters.value = { search: "vue", page: 1 };
```

This is useful for resetting form state or assigning a fresh API response: the object changes, but the `filters` ref stays the same.

## Use `reactive` for a stable object

`reactive` wraps an object, array, or collection in a proxy. It doesn't accept primitive values. Read and write properties directly, without `.value`:

```js
import { reactive } from "vue";

const filters = reactive({ search: "", page: 1 });

filters.search = "vue";
filters.page = 1;
```

Vue tracks reads and writes through that proxy. Reassigning a variable to a different object doesn't move existing consumers over to the new object. If replacing the whole value is part of the design, use a `ref` instead.

## Destructuring a reactive object

Destructuring a primitive property takes a snapshot, not a reactive binding. Keep using `state.count`, or use `toRefs` if you need to destructure while keeping the property linked:

```js
import { reactive, toRefs } from "vue";

const state = reactive({ count: 0 });
const { count: snapshot } = state;
const { count } = toRefs(state);

state.count++;
console.log(snapshot);    // 0
console.log(count.value); // 1

count.value++;
console.log(state.count); // 2
```

Use `ref` for standalone values and state you replace. Reach for `reactive` when a stable object with direct property access makes the code simpler. For more detail, see Vue's [Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html) and [reactivity utilities](https://vuejs.org/api/reactivity-utilities.html#torefs).
