[**harmonylink**](../README.md) • **Docs**

***

[harmonylink](../globals.md) / Queue

# Class: Queue

## Extends

- `Array`\<[`Track`](Track.md)\>

## Constructors

### new Queue()

> **new Queue**(): [`Queue`](Queue.md)

#### Returns

[`Queue`](Queue.md)

#### Overrides

`Array<Track>.constructor`

#### Defined in

src/player/Queue.ts:8

## Properties

### \[unscopables\]

> `readonly` **\[unscopables\]**: `object`

Is an object whose properties have the value 'true'
when they will be absent when used in a 'with' statement.

#### \[unscopables\]?

> `readonly` `optional` **\[unscopables\]**: `boolean`

Is an object whose properties have the value 'true'
when they will be absent when used in a 'with' statement.

#### length?

> `optional` **length**: `boolean`

Gets or sets the length of the array. This is a number one higher than the highest index in the array.

#### \[iterator\]?

> `optional` **\[iterator\]**

#### at?

> `optional` **at**

#### concat?

> `optional` **concat**

#### copyWithin?

> `optional` **copyWithin**

#### entries?

> `optional` **entries**

#### every?

> `optional` **every**

#### fill?

> `optional` **fill**

#### filter?

> `optional` **filter**

#### find?

> `optional` **find**

#### findIndex?

> `optional` **findIndex**

#### findLast?

> `optional` **findLast**

#### findLastIndex?

> `optional` **findLastIndex**

#### flat?

> `optional` **flat**

#### flatMap?

> `optional` **flatMap**

#### forEach?

> `optional` **forEach**

#### includes?

> `optional` **includes**

#### indexOf?

> `optional` **indexOf**

#### join?

> `optional` **join**

#### keys?

> `optional` **keys**

#### lastIndexOf?

> `optional` **lastIndexOf**

#### map?

> `optional` **map**

#### pop?

> `optional` **pop**

#### push?

> `optional` **push**

#### reduce?

> `optional` **reduce**

#### reduceRight?

> `optional` **reduceRight**

#### reverse?

> `optional` **reverse**

#### shift?

> `optional` **shift**

#### slice?

> `optional` **slice**

#### some?

> `optional` **some**

#### sort?

> `optional` **sort**

#### splice?

> `optional` **splice**

#### toLocaleString?

> `optional` **toLocaleString**

#### toReversed?

> `optional` **toReversed**

#### toSorted?

> `optional` **toSorted**

#### toSpliced?

> `optional` **toSpliced**

#### toString?

> `optional` **toString**

#### unshift?

> `optional` **unshift**

#### values?

> `optional` **values**

#### with?

> `optional` **with**

#### Inherited from

`Array.[unscopables]`

#### Defined in

node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:97

***

### currentTrack

> **currentTrack**: `null` \| [`Track`](Track.md) = `null`

#### Defined in

src/player/Queue.ts:5

***

### length

> **length**: `number`

Gets or sets the length of the array. This is a number one higher than the highest index in the array.

#### Inherited from

`Array.length`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1326

***

### previousTrack

> **previousTrack**: `null` \| [`Track`](Track.md) = `null`

#### Defined in

src/player/Queue.ts:6

***

### \[species\]

> `readonly` `static` **\[species\]**: `ArrayConstructor`

#### Inherited from

`Array.[species]`

#### Defined in

node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:316

## Accessors

### current

> `get` **current**(): `null` \| [`Track`](Track.md)

Returns the first track in the queue.

#### Returns

`null` \| [`Track`](Track.md)

The first track in the queue, or undefined if the queue is empty.

#### Defined in

src/player/Queue.ts:24

***

### next

> `get` **next**(): [`Track`](Track.md)

Returns the next track in the queue.

#### Returns

[`Track`](Track.md)

The next track in the queue, or undefined if the queue is empty.

#### Defined in

src/player/Queue.ts:32

***

### previous

> `get` **previous**(): `null` \| [`Track`](Track.md)

#### Returns

`null` \| [`Track`](Track.md)

#### Defined in

src/player/Queue.ts:36

***

### size

> `get` **size**(): `number`

Returns the number of tracks in the queue.

#### Returns

`number`

#### Defined in

src/player/Queue.ts:16

## Methods

### \[iterator\]()

> **\[iterator\]**(): `IterableIterator`\<[`Track`](Track.md)\>

Iterator

#### Returns

`IterableIterator`\<[`Track`](Track.md)\>

#### Inherited from

`Array.[iterator]`

#### Defined in

node\_modules/typescript/lib/lib.es2015.iterable.d.ts:58

***

### \_cleanUp()

> **\_cleanUp**(): `void`

#### Returns

`void`

#### Defined in

src/player/Queue.ts:93

***

### \_next()

> **\_next**(): `null` \| [`Track`](Track.md)

Shifts the queue to the next track.

#### Returns

`null` \| [`Track`](Track.md)

The next track in the queue, or null if the queue is empty.

#### Defined in

src/player/Queue.ts:85

***

### add()

> **add**(`track`): `this`

Adds a track to the queue.

#### Parameters

• **track**: [`Track`](Track.md)

The track to add to the queue.

#### Returns

`this`

The queue with the added track.

#### Defined in

src/player/Queue.ts:45

***

### at()

> **at**(`index`): `undefined` \| [`Track`](Track.md)

Returns the item located at the specified index.

#### Parameters

• **index**: `number`

The zero-based index of the desired code unit. A negative index will count back from the last item.

#### Returns

`undefined` \| [`Track`](Track.md)

#### Inherited from

`Array.at`

#### Defined in

node\_modules/typescript/lib/lib.es2022.array.d.ts:24

***

### clear()

> **clear**(): [] \| [`Track`](Track.md)[]

Clears the entire queue.

#### Returns

[] \| [`Track`](Track.md)[]

An array containing all the cleared tracks, or an empty array if the queue was already empty.

#### Defined in

src/player/Queue.ts:64

***

### concat()

#### concat(items)

> **concat**(...`items`): [`Track`](Track.md)[]

Combines two or more arrays.
This method returns a new array without modifying any existing arrays.

##### Parameters

• ...**items**: `ConcatArray`\<[`Track`](Track.md)\>[]

Additional arrays and/or items to add to the end of the array.

##### Returns

[`Track`](Track.md)[]

##### Inherited from

`Array.concat`

##### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1350

#### concat(items)

> **concat**(...`items`): [`Track`](Track.md)[]

Combines two or more arrays.
This method returns a new array without modifying any existing arrays.

##### Parameters

• ...**items**: ([`Track`](Track.md) \| `ConcatArray`\<[`Track`](Track.md)\>)[]

Additional arrays and/or items to add to the end of the array.

##### Returns

[`Track`](Track.md)[]

##### Inherited from

`Array.concat`

##### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1356

***

### copyWithin()

> **copyWithin**(`target`, `start`, `end`?): `this`

Returns the this object after copying a section of the array identified by start and end
to the same array starting at position target

#### Parameters

• **target**: `number`

If target is negative, it is treated as length+target where length is the
length of the array.

• **start**: `number`

If start is negative, it is treated as length+start. If end is negative, it
is treated as length+end.

• **end?**: `number`

If not specified, length of the this object is used as its default value.

#### Returns

`this`

#### Inherited from

`Array.copyWithin`

#### Defined in

node\_modules/typescript/lib/lib.es2015.core.d.ts:62

***

### entries()

> **entries**(): `IterableIterator`\<[`number`, [`Track`](Track.md)]\>

Returns an iterable of key, value pairs for every entry in the array

#### Returns

`IterableIterator`\<[`number`, [`Track`](Track.md)]\>

#### Inherited from

`Array.entries`

#### Defined in

node\_modules/typescript/lib/lib.es2015.iterable.d.ts:63

***

### every()

#### every(predicate, thisArg)

> **every**\<`S`\>(`predicate`, `thisArg`?): `this is S[]`

Determines whether all the members of an array satisfy the specified test.

##### Type Parameters

• **S** *extends* [`Track`](Track.md)

##### Parameters

• **predicate**

A function that accepts up to three arguments. The every method calls
the predicate function for each element in the array until the predicate returns a value
which is coercible to the Boolean value false, or until the end of the array.

• **thisArg?**: `any`

An object to which the this keyword can refer in the predicate function.
If thisArg is omitted, undefined is used as the this value.

##### Returns

`this is S[]`

##### Inherited from

`Array.every`

##### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1433

#### every(predicate, thisArg)

> **every**(`predicate`, `thisArg`?): `boolean`

Determines whether all the members of an array satisfy the specified test.

##### Parameters

• **predicate**

A function that accepts up to three arguments. The every method calls
the predicate function for each element in the array until the predicate returns a value
which is coercible to the Boolean value false, or until the end of the array.

• **thisArg?**: `any`

An object to which the this keyword can refer in the predicate function.
If thisArg is omitted, undefined is used as the this value.

##### Returns

`boolean`

##### Inherited from

`Array.every`

##### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1442

***

### fill()

> **fill**(`value`, `start`?, `end`?): `this`

Changes all array elements from `start` to `end` index to a static `value` and returns the modified array

#### Parameters

• **value**: [`Track`](Track.md)

value to fill array section with

• **start?**: `number`

index to start filling the array at. If start is negative, it is treated as
length+start where length is the length of the array.

• **end?**: `number`

index to stop filling the array at. If end is negative, it is treated as
length+end.

#### Returns

`this`

#### Inherited from

`Array.fill`

#### Defined in

node\_modules/typescript/lib/lib.es2015.core.d.ts:51

***

### filter()

#### filter(predicate, thisArg)

> **filter**\<`S`\>(`predicate`, `thisArg`?): `S`[]

Returns the elements of an array that meet the condition specified in a callback function.

##### Type Parameters

• **S** *extends* [`Track`](Track.md)

##### Parameters

• **predicate**

A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.

• **thisArg?**: `any`

An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.

##### Returns

`S`[]

##### Inherited from

`Array.filter`

##### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1469

#### filter(predicate, thisArg)

> **filter**(`predicate`, `thisArg`?): [`Track`](Track.md)[]

Returns the elements of an array that meet the condition specified in a callback function.

##### Parameters

• **predicate**

A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.

• **thisArg?**: `any`

An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.

##### Returns

[`Track`](Track.md)[]

##### Inherited from

`Array.filter`

##### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1475

***

### find()

#### find(predicate, thisArg)

> **find**\<`S`\>(`predicate`, `thisArg`?): `undefined` \| `S`

Returns the value of the first element in the array where predicate is true, and undefined
otherwise.

##### Type Parameters

• **S** *extends* [`Track`](Track.md)

##### Parameters

• **predicate**

find calls predicate once for each element of the array, in ascending
order, until it finds one where predicate returns true. If such an element is found, find
immediately returns that element value. Otherwise, find returns undefined.

• **thisArg?**: `any`

If provided, it will be used as the this value for each invocation of
predicate. If it is not provided, undefined is used instead.

##### Returns

`undefined` \| `S`

##### Inherited from

`Array.find`

##### Defined in

node\_modules/typescript/lib/lib.es2015.core.d.ts:29

#### find(predicate, thisArg)

> **find**(`predicate`, `thisArg`?): `undefined` \| [`Track`](Track.md)

##### Parameters

• **predicate**

• **thisArg?**: `any`

##### Returns

`undefined` \| [`Track`](Track.md)

##### Inherited from

`Array.find`

##### Defined in

node\_modules/typescript/lib/lib.es2015.core.d.ts:30

***

### findIndex()

> **findIndex**(`predicate`, `thisArg`?): `number`

Returns the index of the first element in the array where predicate is true, and -1
otherwise.

#### Parameters

• **predicate**

find calls predicate once for each element of the array, in ascending
order, until it finds one where predicate returns true. If such an element is found,
findIndex immediately returns that element index. Otherwise, findIndex returns -1.

• **thisArg?**: `any`

If provided, it will be used as the this value for each invocation of
predicate. If it is not provided, undefined is used instead.

#### Returns

`number`

#### Inherited from

`Array.findIndex`

#### Defined in

node\_modules/typescript/lib/lib.es2015.core.d.ts:41

***

### findLast()

#### findLast(predicate, thisArg)

> **findLast**\<`S`\>(`predicate`, `thisArg`?): `undefined` \| `S`

Returns the value of the last element in the array where predicate is true, and undefined
otherwise.

##### Type Parameters

• **S** *extends* [`Track`](Track.md)

##### Parameters

• **predicate**

findLast calls predicate once for each element of the array, in descending
order, until it finds one where predicate returns true. If such an element is found, findLast
immediately returns that element value. Otherwise, findLast returns undefined.

• **thisArg?**: `any`

If provided, it will be used as the this value for each invocation of
predicate. If it is not provided, undefined is used instead.

##### Returns

`undefined` \| `S`

##### Inherited from

`Array.findLast`

##### Defined in

node\_modules/typescript/lib/lib.es2023.array.d.ts:29

#### findLast(predicate, thisArg)

> **findLast**(`predicate`, `thisArg`?): `undefined` \| [`Track`](Track.md)

##### Parameters

• **predicate**

• **thisArg?**: `any`

##### Returns

`undefined` \| [`Track`](Track.md)

##### Inherited from

`Array.findLast`

##### Defined in

node\_modules/typescript/lib/lib.es2023.array.d.ts:30

***

### findLastIndex()

> **findLastIndex**(`predicate`, `thisArg`?): `number`

Returns the index of the last element in the array where predicate is true, and -1
otherwise.

#### Parameters

• **predicate**

findLastIndex calls predicate once for each element of the array, in descending
order, until it finds one where predicate returns true. If such an element is found,
findLastIndex immediately returns that element index. Otherwise, findLastIndex returns -1.

• **thisArg?**: `any`

If provided, it will be used as the this value for each invocation of
predicate. If it is not provided, undefined is used instead.

#### Returns

`number`

#### Inherited from

`Array.findLastIndex`

#### Defined in

node\_modules/typescript/lib/lib.es2023.array.d.ts:41

***

### flat()

> **flat**\<`A`, `D`\>(`this`, `depth`?): `FlatArray`\<`A`, `D`\>[]

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth.

#### Type Parameters

• **A**

• **D** *extends* `number` = `1`

#### Parameters

• **this**: `A`

• **depth?**: `D`

The maximum recursion depth

#### Returns

`FlatArray`\<`A`, `D`\>[]

#### Inherited from

`Array.flat`

#### Defined in

node\_modules/typescript/lib/lib.es2019.array.d.ts:75

***

### flatMap()

> **flatMap**\<`U`, `This`\>(`callback`, `thisArg`?): `U`[]

Calls a defined callback function on each element of an array. Then, flattens the result into
a new array.
This is identical to a map followed by flat with depth 1.

#### Type Parameters

• **U**

• **This** = `undefined`

#### Parameters

• **callback**

A function that accepts up to three arguments. The flatMap method calls the
callback function one time for each element in the array.

• **thisArg?**: `This`

An object to which the this keyword can refer in the callback function. If
thisArg is omitted, undefined is used as the this value.

#### Returns

`U`[]

#### Inherited from

`Array.flatMap`

#### Defined in

node\_modules/typescript/lib/lib.es2019.array.d.ts:64

***

### forEach()

> **forEach**(`callbackfn`, `thisArg`?): `void`

Performs the specified action for each element in an array.

#### Parameters

• **callbackfn**

A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.

• **thisArg?**: `any`

An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.

#### Returns

`void`

#### Inherited from

`Array.forEach`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1457

***

### includes()

> **includes**(`searchElement`, `fromIndex`?): `boolean`

Determines whether an array includes a certain element, returning true or false as appropriate.

#### Parameters

• **searchElement**: [`Track`](Track.md)

The element to search for.

• **fromIndex?**: `number`

The position in this array at which to begin searching for searchElement.

#### Returns

`boolean`

#### Inherited from

`Array.includes`

#### Defined in

node\_modules/typescript/lib/lib.es2016.array.include.d.ts:25

***

### indexOf()

> **indexOf**(`searchElement`, `fromIndex`?): `number`

Returns the index of the first occurrence of a value in an array, or -1 if it is not present.

#### Parameters

• **searchElement**: [`Track`](Track.md)

The value to locate in the array.

• **fromIndex?**: `number`

The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.

#### Returns

`number`

#### Inherited from

`Array.indexOf`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1418

***

### join()

> **join**(`separator`?): `string`

Adds all the elements of an array into a string, separated by the specified separator string.

#### Parameters

• **separator?**: `string`

A string used to separate one element of the array from the next in the resulting string. If omitted, the array elements are separated with a comma.

#### Returns

`string`

#### Inherited from

`Array.join`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1361

***

### keys()

> **keys**(): `IterableIterator`\<`number`\>

Returns an iterable of keys in the array

#### Returns

`IterableIterator`\<`number`\>

#### Inherited from

`Array.keys`

#### Defined in

node\_modules/typescript/lib/lib.es2015.iterable.d.ts:68

***

### lastIndexOf()

> **lastIndexOf**(`searchElement`, `fromIndex`?): `number`

Returns the index of the last occurrence of a specified value in an array, or -1 if it is not present.

#### Parameters

• **searchElement**: [`Track`](Track.md)

The value to locate in the array.

• **fromIndex?**: `number`

The array index at which to begin searching backward. If fromIndex is omitted, the search starts at the last index in the array.

#### Returns

`number`

#### Inherited from

`Array.lastIndexOf`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1424

***

### map()

> **map**\<`U`\>(`callbackfn`, `thisArg`?): `U`[]

Calls a defined callback function on each element of an array, and returns an array that contains the results.

#### Type Parameters

• **U**

#### Parameters

• **callbackfn**

A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.

• **thisArg?**: `any`

An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.

#### Returns

`U`[]

#### Inherited from

`Array.map`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1463

***

### pop()

> **pop**(): `undefined` \| [`Track`](Track.md)

Removes the last element from an array and returns it.
If the array is empty, undefined is returned and the array is not modified.

#### Returns

`undefined` \| [`Track`](Track.md)

#### Inherited from

`Array.pop`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1339

***

### push()

> **push**(...`items`): `number`

Appends new elements to the end of an array, and returns the new length of the array.

#### Parameters

• ...**items**: [`Track`](Track.md)[]

New elements to add to the array.

#### Returns

`number`

#### Inherited from

`Array.push`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1344

***

### reduce()

#### reduce(callbackfn)

> **reduce**(`callbackfn`): [`Track`](Track.md)

Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

##### Parameters

• **callbackfn**

A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.

##### Returns

[`Track`](Track.md)

##### Inherited from

`Array.reduce`

##### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1481

#### reduce(callbackfn, initialValue)

> **reduce**(`callbackfn`, `initialValue`): [`Track`](Track.md)

##### Parameters

• **callbackfn**

• **initialValue**: [`Track`](Track.md)

##### Returns

[`Track`](Track.md)

##### Inherited from

`Array.reduce`

##### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1482

#### reduce(callbackfn, initialValue)

> **reduce**\<`U`\>(`callbackfn`, `initialValue`): `U`

Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

##### Type Parameters

• **U**

##### Parameters

• **callbackfn**

A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.

• **initialValue**: `U`

If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.

##### Returns

`U`

##### Inherited from

`Array.reduce`

##### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1488

***

### reduceRight()

#### reduceRight(callbackfn)

> **reduceRight**(`callbackfn`): [`Track`](Track.md)

Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

##### Parameters

• **callbackfn**

A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.

##### Returns

[`Track`](Track.md)

##### Inherited from

`Array.reduceRight`

##### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1494

#### reduceRight(callbackfn, initialValue)

> **reduceRight**(`callbackfn`, `initialValue`): [`Track`](Track.md)

##### Parameters

• **callbackfn**

• **initialValue**: [`Track`](Track.md)

##### Returns

[`Track`](Track.md)

##### Inherited from

`Array.reduceRight`

##### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1495

#### reduceRight(callbackfn, initialValue)

> **reduceRight**\<`U`\>(`callbackfn`, `initialValue`): `U`

Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

##### Type Parameters

• **U**

##### Parameters

• **callbackfn**

A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.

• **initialValue**: `U`

If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.

##### Returns

`U`

##### Inherited from

`Array.reduceRight`

##### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1501

***

### remove()

> **remove**(`index`): `this`

Removes a track from the queue by its index.

#### Parameters

• **index**: `number`

The index of the track to remove.

#### Returns

`this`

The queue with the removed track.

#### Defined in

src/player/Queue.ts:55

***

### reverse()

> **reverse**(): [`Track`](Track.md)[]

Reverses the elements in an array in place.
This method mutates the array and returns a reference to the same array.

#### Returns

[`Track`](Track.md)[]

#### Inherited from

`Array.reverse`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1366

***

### shift()

> **shift**(): `undefined` \| [`Track`](Track.md)

Removes the first element from an array and returns it.
If the array is empty, undefined is returned and the array is not modified.

#### Returns

`undefined` \| [`Track`](Track.md)

#### Inherited from

`Array.shift`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1371

***

### shuffle()

> **shuffle**(): `this`

Shuffles the tracks in the queue.

#### Returns

`this`

Returns the shuffled queue.

#### Defined in

src/player/Queue.ts:72

***

### slice()

> **slice**(`start`?, `end`?): [`Track`](Track.md)[]

Returns a copy of a section of an array.
For both start and end, a negative index can be used to indicate an offset from the end of the array.
For example, -2 refers to the second to last element of the array.

#### Parameters

• **start?**: `number`

The beginning index of the specified portion of the array.
If start is undefined, then the slice begins at index 0.

• **end?**: `number`

The end index of the specified portion of the array. This is exclusive of the element at the index 'end'.
If end is undefined, then the slice extends to the end of the array.

#### Returns

[`Track`](Track.md)[]

#### Inherited from

`Array.slice`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1381

***

### some()

> **some**(`predicate`, `thisArg`?): `boolean`

Determines whether the specified callback function returns true for any element of an array.

#### Parameters

• **predicate**

A function that accepts up to three arguments. The some method calls
the predicate function for each element in the array until the predicate returns a value
which is coercible to the Boolean value true, or until the end of the array.

• **thisArg?**: `any`

An object to which the this keyword can refer in the predicate function.
If thisArg is omitted, undefined is used as the this value.

#### Returns

`boolean`

#### Inherited from

`Array.some`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1451

***

### sort()

> **sort**(`compareFn`?): `this`

Sorts an array in place.
This method mutates the array and returns a reference to the same array.

#### Parameters

• **compareFn?**

Function used to determine the order of the elements. It is expected to return
a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
```ts
[11,2,22,1].sort((a, b) => a - b)
```

#### Returns

`this`

#### Inherited from

`Array.sort`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1392

***

### splice()

#### splice(start, deleteCount)

> **splice**(`start`, `deleteCount`?): [`Track`](Track.md)[]

Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

##### Parameters

• **start**: `number`

The zero-based location in the array from which to start removing elements.

• **deleteCount?**: `number`

The number of elements to remove.

##### Returns

[`Track`](Track.md)[]

An array containing the elements that were deleted.

##### Inherited from

`Array.splice`

##### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1399

#### splice(start, deleteCount, items)

> **splice**(`start`, `deleteCount`, ...`items`): [`Track`](Track.md)[]

Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

##### Parameters

• **start**: `number`

The zero-based location in the array from which to start removing elements.

• **deleteCount**: `number`

The number of elements to remove.

• ...**items**: [`Track`](Track.md)[]

Elements to insert into the array in place of the deleted elements.

##### Returns

[`Track`](Track.md)[]

An array containing the elements that were deleted.

##### Inherited from

`Array.splice`

##### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1407

***

### toLocaleString()

> **toLocaleString**(): `string`

Returns a string representation of an array. The elements are converted to string using their toLocaleString methods.

#### Returns

`string`

#### Inherited from

`Array.toLocaleString`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1334

***

### toReversed()

> **toReversed**(): [`Track`](Track.md)[]

Returns a copy of an array with its elements reversed.

#### Returns

[`Track`](Track.md)[]

#### Inherited from

`Array.toReversed`

#### Defined in

node\_modules/typescript/lib/lib.es2023.array.d.ts:46

***

### toSorted()

> **toSorted**(`compareFn`?): [`Track`](Track.md)[]

Returns a copy of an array with its elements sorted.

#### Parameters

• **compareFn?**

Function used to determine the order of the elements. It is expected to return
a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
```ts
[11, 2, 22, 1].toSorted((a, b) => a - b) // [1, 2, 11, 22]
```

#### Returns

[`Track`](Track.md)[]

#### Inherited from

`Array.toSorted`

#### Defined in

node\_modules/typescript/lib/lib.es2023.array.d.ts:57

***

### toSpliced()

#### toSpliced(start, deleteCount, items)

> **toSpliced**(`start`, `deleteCount`, ...`items`): [`Track`](Track.md)[]

Copies an array and removes elements and, if necessary, inserts new elements in their place. Returns the copied array.

##### Parameters

• **start**: `number`

The zero-based location in the array from which to start removing elements.

• **deleteCount**: `number`

The number of elements to remove.

• ...**items**: [`Track`](Track.md)[]

Elements to insert into the copied array in place of the deleted elements.

##### Returns

[`Track`](Track.md)[]

The copied array.

##### Inherited from

`Array.toSpliced`

##### Defined in

node\_modules/typescript/lib/lib.es2023.array.d.ts:66

#### toSpliced(start, deleteCount)

> **toSpliced**(`start`, `deleteCount`?): [`Track`](Track.md)[]

Copies an array and removes elements while returning the remaining elements.

##### Parameters

• **start**: `number`

The zero-based location in the array from which to start removing elements.

• **deleteCount?**: `number`

The number of elements to remove.

##### Returns

[`Track`](Track.md)[]

A copy of the original array with the remaining elements.

##### Inherited from

`Array.toSpliced`

##### Defined in

node\_modules/typescript/lib/lib.es2023.array.d.ts:74

***

### toString()

> **toString**(): `string`

Returns a string representation of an array.

#### Returns

`string`

#### Inherited from

`Array.toString`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1330

***

### unshift()

> **unshift**(...`items`): `number`

Inserts new elements at the start of an array, and returns the new length of the array.

#### Parameters

• ...**items**: [`Track`](Track.md)[]

Elements to insert at the start of the array.

#### Returns

`number`

#### Inherited from

`Array.unshift`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1412

***

### values()

> **values**(): `IterableIterator`\<[`Track`](Track.md)\>

Returns an iterable of values in the array

#### Returns

`IterableIterator`\<[`Track`](Track.md)\>

#### Inherited from

`Array.values`

#### Defined in

node\_modules/typescript/lib/lib.es2015.iterable.d.ts:73

***

### with()

> **with**(`index`, `value`): [`Track`](Track.md)[]

Copies an array, then overwrites the value at the provided index with the
given value. If the index is negative, then it replaces from the end
of the array.

#### Parameters

• **index**: `number`

The index of the value to overwrite. If the index is
negative, then it replaces from the end of the array.

• **value**: [`Track`](Track.md)

The value to write into the copied array.

#### Returns

[`Track`](Track.md)[]

The copied array with the updated value.

#### Inherited from

`Array.with`

#### Defined in

node\_modules/typescript/lib/lib.es2023.array.d.ts:85

***

### from()

#### from(arrayLike)

> `static` **from**\<`T`\>(`arrayLike`): `T`[]

Creates an array from an array-like object.

##### Type Parameters

• **T**

##### Parameters

• **arrayLike**: `ArrayLike`\<`T`\>

An array-like object to convert to an array.

##### Returns

`T`[]

##### Inherited from

`Array.from`

##### Defined in

node\_modules/typescript/lib/lib.es2015.core.d.ts:70

#### from(arrayLike, mapfn, thisArg)

> `static` **from**\<`T`, `U`\>(`arrayLike`, `mapfn`, `thisArg`?): `U`[]

Creates an array from an iterable object.

##### Type Parameters

• **T**

• **U**

##### Parameters

• **arrayLike**: `ArrayLike`\<`T`\>

An array-like object to convert to an array.

• **mapfn**

A mapping function to call on every element of the array.

• **thisArg?**: `any`

Value of 'this' used to invoke the mapfn.

##### Returns

`U`[]

##### Inherited from

`Array.from`

##### Defined in

node\_modules/typescript/lib/lib.es2015.core.d.ts:78

#### from(iterable)

> `static` **from**\<`T`\>(`iterable`): `T`[]

Creates an array from an iterable object.

##### Type Parameters

• **T**

##### Parameters

• **iterable**: `Iterable`\<`T`\> \| `ArrayLike`\<`T`\>

An iterable object to convert to an array.

##### Returns

`T`[]

##### Inherited from

`Array.from`

##### Defined in

node\_modules/typescript/lib/lib.es2015.iterable.d.ts:81

#### from(iterable, mapfn, thisArg)

> `static` **from**\<`T`, `U`\>(`iterable`, `mapfn`, `thisArg`?): `U`[]

Creates an array from an iterable object.

##### Type Parameters

• **T**

• **U**

##### Parameters

• **iterable**: `Iterable`\<`T`\> \| `ArrayLike`\<`T`\>

An iterable object to convert to an array.

• **mapfn**

A mapping function to call on every element of the array.

• **thisArg?**: `any`

Value of 'this' used to invoke the mapfn.

##### Returns

`U`[]

##### Inherited from

`Array.from`

##### Defined in

node\_modules/typescript/lib/lib.es2015.iterable.d.ts:89

***

### isArray()

> `static` **isArray**(`arg`): `arg is any[]`

#### Parameters

• **arg**: `any`

#### Returns

`arg is any[]`

#### Inherited from

`Array.isArray`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1513

***

### of()

> `static` **of**\<`T`\>(...`items`): `T`[]

Returns a new array from a set of elements.

#### Type Parameters

• **T**

#### Parameters

• ...**items**: `T`[]

A set of elements to include in the new array object.

#### Returns

`T`[]

#### Inherited from

`Array.of`

#### Defined in

node\_modules/typescript/lib/lib.es2015.core.d.ts:84
