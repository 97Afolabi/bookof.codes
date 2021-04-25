---
title: 'Learn How to Pre-render Pages.'
excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
date: '2020-03-16T05:35:07.322Z'
---

## Each Render Has Its Own Props and State

Before we can talk about effects, we need to talk about rendering.
Here’s a counter. Look at the highlighted line closely:

```go
  package main

  func Counter() {
    name := "uche"
    log.PrintLn(name)

  }
```

What does it mean? Does `count` somehow “watch” changes to our state and update automatically? That might be a useful first intuition when you learn React but it’s _not_ an [accurate mental model]

**In this example, `count` is just a number.** It’s not a magic “data binding”, a “watcher”, a “proxy”, or anything else. It’s a good old number like this one:

```jsx
const count = 42;
// ...
<p>You clicked {count} times</p>;
// ...
```

The first time our component renders, the `count` variable we get from `useState()` is `0`. When we call `setCount(1)`, React calls our component again. This time, `count` will be `1`. And so on:

```go
package main
// During first render
function main() {
 log.PrintLn("hello")
}

```

**Whenever we update the state, React calls our component. Each render result “sees” its own `counter` state value which is a _constant_ inside our function.**

So this line doesn’t do any special data binding:

```jsx
<p>You clicked {count} times</p>
```

**It only embeds a number value into the render output.** That number is provided by React. When we `setCount`, React calls our component again with a different `count` value. Then React updates the DOM to match our latest render output.

The key takeaway is that the `count` constant inside any particular render doesn’t change over time. It’s our component that’s called again — and each render “sees” its own `count` value that’s isolated between renders.

## Each Render Has Its Own Event Handlers

So far so good. What about event handlers?

Look at this example. It shows an alert with the `count` after three seconds:

```javascript
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
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleAlertClick}>Show alert</button>
    </div>
  );
}
```

Let’s say I do this sequence of steps:

- **Increment** the counter to 3
- **Press** “Show alert”
- **Increment** it to 5 before the timeout fires

What do you expect the alert to show? Will it show 5 — which is the counter state at the time of the alert? Or will it show 3 — the state when I clicked?

The alert will “capture” the state at the time I clicked the button.

But how does it work?

We’ve discussed that the `count` value is constant for every particular call to our function. It’s worth emphasizing this — **our function gets called many times (once per each render), but every one of those times the `count` value inside of it is constant and set to a particular value (state for that render).**

This is not specific to React — regular functions work in a similar way:

```javascript
function sayHi(person) {
  const name = person.name;
  setTimeout(() => {
    alert('Hello, ' + name);
  }, 3000);
}

let someone = { name: 'Dan' };
sayHi(someone);

someone = { name: 'Yuzhi' };
sayHi(someone);

someone = { name: 'Dominic' };
sayHi(someone);
```

In [this example](https://codesandbox.io/s/mm6ww11lk8), the outer `someone` variable is reassigned several times. (Just like somewhere in React, the _current_ component state can change.) **However, inside `sayHi`, there is a local `name` constant that is associated with a `person` from a particular call.** That constant is local, so it’s isolated between the calls! As a result, when the timeouts fire, each alert “remembers” its own `name`.

This explains how our event handler captures the `count` at the time of the click. If we apply the same substitution principle, each render “sees” its own `count`:
