---
title: 'Learn How to Pre-render Pages.'
excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
date: '2020-03-16T05:35:07.322Z'
---

## Each Render Has Its Own Props and State

Before we can talk about effects, we need to talk about rendering.

Here’s a counter. Look at the highlighted line closely:

```jsx{6}
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

What does it mean? Does `count` somehow “watch” changes to our state and update automatically? That might be a useful first intuition when you learn React but it’s _not_ an [accurate mental model](https://overreacted.io/react-as-a-ui-runtime/).

**In this example, `count` is just a number.** It’s not a magic “data binding”, a “watcher”, a “proxy”, or anything else. It’s a good old number like this one:

```jsx
const count = 42;
// ...
<p>You clicked {count} times</p>;
// ...
```

The first time our component renders, the `count` variable we get from `useState()` is `0`. When we call `setCount(1)`, React calls our component again. This time, `count` will be `1`. And so on:

```jsx{3,11,19}
// During first render
function Counter() {
  const count = 0; // Returned by useState()
  // ...
  <p>You clicked {count} times</p>
  // ...
}

// After a click, our function is called again
function Counter() {
  const count = 1; // Returned by useState()
  // ...
  <p>You clicked {count} times</p>
  // ...
}

// After another click, our function is called again
function Counter() {
  const count = 2; // Returned by useState()
  // ...
  <p>You clicked {count} times</p>
  // ...
}
```

**Whenever we update the state, React calls our component. Each render result “sees” its own `counter` state value which is a _constant_ inside our function.**

So this line doesn’t do any special data binding:

```jsx
<p>You clicked {count} times</p>
```

**It only embeds a number value into the render output.** That number is provided by React. When we `setCount`, React calls our component again with a different `count` value. Then React updates the DOM to match our latest render output.

The key takeaway is that the `count` constant inside any particular render doesn’t change over time. It’s our component that’s called again — and each render “sees” its own `count` value that’s isolated between renders.

_(For an in-depth overview of this process, check out my post [React as a UI Runtime](https://overreacted.io/react-as-a-ui-runtime/).)_

## Each Render Has Its Own Event Handlers

So far so good. What about event handlers?

Look at this example. It shows an alert with the `count` after three seconds:

```jsx{4-8,16-18}
function Counter() {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={handleAlertClick}>
        Show alert
      </button>
    </div>
  );
}
```

Let’s say I do this sequence of steps:

- **Increment** the counter to 3
- **Press** “Show alert”
- **Increment** it to 5 before the timeout fires

![Counter demo](./counter.gif)

What do you expect the alert to show? Will it show 5 — which is the counter state at the time of the alert? Or will it show 3 — the state when I clicked?

---

_spoilers ahead_

---

Go ahead and [try it yourself!](https://codesandbox.io/s/w2wxl3yo0l)

If the behavior doesn’t quite make sense to you, imagine a more practical example: a chat app with the current recipient ID in the state, and a Send button. [This article](https://overreacted.io/how-are-function-components-different-from-classes/) explores the reasons in depth but the correct answer is 3.

The alert will “capture” the state at the time I clicked the button.

_(There are ways to implement the other behavior too but I’ll be focusing on the default case for now. When building a mental model, it’s important that we distinguish the “path of least resistance” from the opt-in escape hatches.)_

---

But how does it work?

We’ve discussed that the `count` value is constant for every particular call to our function. It’s worth emphasizing this — **our function gets called many times (once per each render), but every one of those times the `count` value inside of it is constant and set to a particular value (state for that render).**

This is not specific to React — regular functions work in a similar way:

```jsx{2}
function sayHi(person) {
  const name = person.name;
  setTimeout(() => {
    alert('Hello, ' + name);
  }, 3000);
}

let someone = {name: 'Dan'};
sayHi(someone);

someone = {name: 'Yuzhi'};
sayHi(someone);

someone = {name: 'Dominic'};
sayHi(someone);
```

In [this example](https://codesandbox.io/s/mm6ww11lk8), the outer `someone` variable is reassigned several times. (Just like somewhere in React, the _current_ component state can change.) **However, inside `sayHi`, there is a local `name` constant that is associated with a `person` from a particular call.** That constant is local, so it’s isolated between the calls! As a result, when the timeouts fire, each alert “remembers” its own `name`.

This explains how our event handler captures the `count` at the time of the click. If we apply the same substitution principle, each render “sees” its own `count`:

```jsx{3,15,27}
// During first render
function Counter() {
  const count = 0; // Returned by useState()
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }
  // ...
}

// After a click, our function is called again
function Counter() {
  const count = 1; // Returned by useState()
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }
  // ...
}

// After another click, our function is called again
function Counter() {
  const count = 2; // Returned by useState()
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }
  // ...
}
```

So effectively, each render returns its own “version” of `handleAlertClick`. Each of those versions “remembers” its own `count`:

```jsx{6,10,19,23,32,36}
// During first render
function Counter() {
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + 0);
    }, 3000);
  }
  // ...
  <button onClick={handleAlertClick} /> // The one with 0 inside
  // ...
}

// After a click, our function is called again
function Counter() {
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + 1);
    }, 3000);
  }
  // ...
  <button onClick={handleAlertClick} /> // The one with 1 inside
  // ...
}

// After another click, our function is called again
function Counter() {
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + 2);
    }, 3000);
  }
  // ...
  <button onClick={handleAlertClick} /> // The one with 2 inside
  // ...
}
```

This is why [in this demo](https://codesandbox.io/s/w2wxl3yo0l) event handlers “belong” to a particular render, and when you click, it keeps using the `counter` state _from_ that render.

**Inside any particular render, props and state forever stay the same.** But if props and state are isolated between renders, so are any values using them (including the event handlers). They also “belong” to a particular render. So even async functions inside an event handler will “see” the same `count` value.

_Side note: I inlined concrete `count` values right into `handleAlertClick` functions above. This mental substitution is safe because `count` can’t possibly change within a particular render. It’s declared as a `const` and is a number. It would be safe to think the same way about other values like objects too, but only if we agree to avoid mutating state. Calling `setSomething(newObj)` with a newly created object instead of mutating it is fine because state belonging to previous renders is intact._

## Each Render Has Its Own Effects

This was supposed to be a post about effects but we still haven’t talked about effects yet! We’ll rectify this now. Turns out, effects aren’t really any different.

Let’s go back to an example from [the docs](https://reactjs.org/docs/hooks-effect.html):

```jsx{4-6}
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

**Here’s a question for you: how does the effect read the latest `count` state?**

Maybe, there’s some kind of “data binding” or “watching” that makes `count` update live inside the effect function? Maybe `count` is a mutable variable that React sets inside our component so that our effect always sees the latest value?

Nope.

We already know that `count` is constant within a particular component render. Event handlers “see” the `count` state from the render that they “belong” to because `count` is a variable in their scope. The same is true for effects!

**It’s not the `count` variable that somehow changes inside an “unchanging” effect. It’s the _effect function itself_ that’s different on every render.**

Each version “sees” the `count` value from the render that it “belongs” to:

```jsx{5-8,17-20,29-32}
// During first render
function Counter() {
  // ...
  useEffect(
    // Effect function from first render
    () => {
      document.title = `You clicked ${0} times`;
    }
  );
  // ...
}

// After a click, our function is called again
function Counter() {
  // ...
  useEffect(
    // Effect function from second render
    () => {
      document.title = `You clicked ${1} times`;
    }
  );
  // ...
}

// After another click, our function is called again
function Counter() {
  // ...
  useEffect(
    // Effect function from third render
    () => {
      document.title = `You clicked ${2} times`;
    }
  );
  // ..
}
```

React remembers the effect function you provided, and runs it after flushing changes to the DOM and letting the browser paint the screen.

So even if we speak of a single conceptual _effect_ here (updating the document title), it is represented by a _different function_ on every render — and each effect function “sees” props and state from the particular render it “belongs” to.

**Conceptually, you can imagine effects are a _part of the render result_.**

Strictly saying, they’re not (in order to [allow Hook composition](https://overreacted.io/why-do-hooks-rely-on-call-order/) without clumsy syntax or runtime overhead). But in the mental model we’re building up, effect functions _belong_ to a particular render in the same way that event handlers do.

---

To make sure we have a solid understanding, let’s recap our first render:

- **React:** Give me the UI when the state is `0`.
- **Your component:**
  - Here’s the render result:
    `<p>You clicked 0 times</p>`.
  - Also remember to run this effect after you’re done: `() => { document.title = 'You clicked 0 times' }`.
- **React:** Sure. Updating the UI. Hey browser, I’m adding some stuff to the DOM.
- **Browser:** Cool, I painted it to the screen.
- **React:** OK, now I’m going to run the effect you gave me.
  - Running `() => { document.title = 'You clicked 0 times' }`.

---

Now let’s recap what happens after we click:

- **Your component:** Hey React, set my state to `1`.
- **React:** Give me the UI for when the state is `1`.
- **Your component:**
  - Here’s the render result:
    `<p>You clicked 1 times</p>`.
  - Also remember to run this effect after you’re done: `() => { document.title = 'You clicked 1 times' }`.
- **React:** Sure. Updating the UI. Hey browser, I’ve changed the DOM.
- **Browser:** Cool, I painted your changes to the screen.
- **React:** OK, now I’ll run the effect that belongs to the render I just did.
  - Running `() => { document.title = 'You clicked 1 times' }`.

---

## Each Render Has Its Own... Everything

**We know now that effects run after every render, are conceptually a part of the component output, and “see” the props and state from that particular render.**

Let’s try a thought experiment. Consider this code:

```jsx{4-8}
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 3000);
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

If I click several times with a small delay, what is the log going to look like?

---

_spoilers ahead_

---

You might think this is a gotcha and the end result is unintuitive. It’s not! We’re going to see a sequence of logs — each one belonging to a particular render and thus with its own `count` value. You can [try it yourself](https://codesandbox.io/s/lyx20m1ol):

![Screen recording of 1, 2, 3, 4, 5 logged in order](./timeout_counter.gif)

You may think: “Of course that’s how it works! How else could it work?”

Well, that’s not how `this.state` works in classes. It’s easy to make the mistake of thinking that this [class implementation](https://codesandbox.io/s/kkymzwjqz3) is equivalent:

```jsx
  componentDidUpdate() {
    setTimeout(() => {
      console.log(`You clicked ${this.state.count} times`);
    }, 3000);
  }
```

However, `this.state.count` always points at the _latest_ count rather than the one belonging to a particular render. So you’ll see `5` logged each time instead:

![Screen recording of 5, 5, 5, 5, 5 logged in order](./timeout_counter_class.gif)

I think it’s ironic that Hooks rely so much on JavaScript closures, and yet it’s the class implementation that suffers from [the canonical wrong-value-in-a-timeout confusion](https://wsvincent.com/javascript-closure-settimeout-for-loop/) that’s often associated with closures. This is because the actual source of the confusion in this example is the mutation (React mutates `this.state` in classes to point to the latest state) and not closures themselves.

**Closures are great when the values you close over never change. That makes them easy to think about because you’re essentially referring to constants.** And as we discussed, props and state never change within a particular render. By the way, we can fix the class version... by [using a closure](https://codesandbox.io/s/w7vjo07055).

## Swimming Against the Tide

At this point it’s important that we call it out explicitly: **every** function inside the component render (including event handlers, effects, timeouts or API calls inside them) captures the props and state of the render call that defined it.

So these two examples are equivalent:

```jsx{4}
function Example(props) {
  useEffect(() => {
    setTimeout(() => {
      console.log(props.counter);
    }, 1000);
  });
  // ...
}
```

```jsx{2,5}
function Example(props) {
  const counter = props.counter;
  useEffect(() => {
    setTimeout(() => {
      console.log(counter);
    }, 1000);
  });
  // ...
}
```

**It doesn’t matter whether you read from props or state “early” inside of your component.** They’re not going to change! Inside the scope of a single render, props and state stay the same. (Destructuring props makes this more obvious.)

Of course, sometimes you _want_ to read the latest rather than captured value inside some callback defined in an effect. The easiest way to do it is by using refs, as described in the last section of [this article](https://overreacted.io/how-are-function-components-different-from-classes/).

Be aware that when you want to read the _future_ props or state from a function in a _past_ render, you’re swimming against the tide. It’s not _wrong_ (and in some cases necessary) but it might look less “clean” to break out of the paradigm. This is an intentional consequence because it helps highlight which code is fragile and depends on timing. In classes, it’s less obvious when this happens.

Here’s a [version of our counter example](https://codesandbox.io/s/rm7z22qnlp) that replicates the class behavior:

```jsx{3,6-7,9-10}
function Example() {
  const [count, setCount] = useState(0);
  const latestCount = useRef(count);

  useEffect(() => {
    // Set the mutable latest value
    latestCount.current = count;
    setTimeout(() => {
      // Read the mutable latest value
      console.log(`You clicked ${latestCount.current} times`);
    }, 3000);
  });
  // ...
```

![Screen recording of 5, 5, 5, 5, 5 logged in order](./timeout_counter_refs.gif)

It might seem quirky to mutate something in React. However, this is exactly how React itself reassigns `this.state` in classes. Unlike with captured props and state, you don’t have any guarantees that reading `latestCount.current` would give you the same value in any particular callback. By definition, you can mutate it any time. This is why it’s not a default, and you have to opt into that.

## So What About Cleanup?

As [the docs explain](https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup), some effects might have a cleanup phase. Essentially, its purpose is to “undo” an effect for cases like subscriptions.

Consider this code:

```jsx
useEffect(() => {
  ChatAPI.subscribeToFriendStatus(props.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.id, handleStatusChange);
  };
});
```

Say `props` is `{id: 10}` on the first render, and `{id: 20}` on the second render. You _might_ think that something like this happens:

- React cleans up the effect for `{id: 10}`.
- React renders UI for `{id: 20}`.
- React runs the effect for `{id: 20}`.

(This is not quite the case.)

With this mental model, you might think the cleanup “sees” the old props because it runs before we re-render, and then the new effect “sees” the new props because it runs after the re-render. That’s the mental model lifted directly from the class lifecycles, and **it’s not accurate here**. Let’s see why.

React only runs the effects after [letting the browser paint](https://medium.com/@dan_abramov/this-benchmark-is-indeed-flawed-c3d6b5b6f97f). This makes your app faster as most effects don’t need to block screen updates. Effect cleanup is also delayed. **The previous effect is cleaned up _after_ the re-render with new props:**

- **React renders UI for `{id: 20}`.**
- The browser paints. We see the UI for `{id: 20}` on the screen.
- **React cleans up the effect for `{id: 10}`.**
- React runs the effect for `{id: 20}`.

You might be wondering: but how can the cleanup of the previous effect still “see” the old `{id: 10}` props if it runs _after_ the props change to `{id: 20}`?

We’ve been here before... 🤔

![Deja vu (cat scene from the Matrix movie)](./deja_vu.gif)

Quoting the previous section:

> Every function inside the component render (including event handlers, effects, timeouts or API calls inside them) captures the props and state of the render call that defined it.

Now the answer is clear! The effect cleanup doesn’t read the “latest” props, whatever that means. It reads props that belong to the render it’s defined in:
