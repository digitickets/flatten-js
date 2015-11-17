# flatten / unflatten
I found the code in StackOverflow.
 
I like it. I use it.

I've made one minor change to support ``flatten({123:{234:{345:'a'}}})`` becoming ``Object {~123.~234.~345: "a"}`` (objects with numeric keys).
