# 4.6.3 Leveraging NPM and the Ecosystem

---

There are over 1,000,000 packages on NPM.

Most are bad.

---

And yet, using packages makes our life much much easier

Packages are **solutions to problems**.

---

**React** is a package, and it solves the problem of _keeping state and the UI in sync_.

---

**React Router** is a package, and it solves the problem of _routing in a React app_.

---

# Modals

---

import modal1 from './assets/modal-1.png';

<img src={modal1} style={{ maxWidth: '100%', maxHeight: '70vh' }} />

---

import modal2 from './assets/modal-2.png';

<img src={modal2} style={{ maxWidth: '100%', maxHeight: '70vh' }} />

---

import modal3 from './assets/modal-3.png';

<img src={modal3} style={{ maxWidth: '100%', maxHeight: '70vh' }} />

---

### Should we build a modal ourselves?

It's a fun exercise, but they're _really_ hard to get right. Especially from an accessibility perspective.

---

There are **a lot** of React modals on NPM...

How do we identify a good one?

---

### 1. Popularity

There are two measures of popularity: NPM downloads and Github stars.

Avoid packages that don't have a lot of NPM downloads. Stars are a weaker signal.

---

### 2. Maintenance

Is the package actively maintained? Are there lots of issues and PRs that have been open for a long time, without any feedback?

---

# NOTE!

Most packages are maintained by 1 person, for free, in their spare time.

This is thankless work (and in fact people are often abusive).

Be kind, and manage expectations accordingly.

---

### 3. Community endorsements

Keep an eye on what prominent folks are using and recommending.

---

### 4. Suitability

Does it do what you need? Is it accessible?

---

# Demo

Look at a few modal packages, evaluate them on these terms

---

# Tooltips

Tooltips are small UI elements that show up on hover, to provide additional context:

import tooltip from './assets/tooltip.gif';

<img src={tooltip} style={{ maxWidth: '100%', maxHeight: '70vh' }} />

---

# Exercise

Take 10 minutes to find a great React tooltip library!

---

### Our policy

There is an infinite number of packages.

Myself and the TCs can't possibly be familiar with all of them.

---

### Our policy

If you use a package from NPM, we may not be able to help you with it.

**Highly recommended:** check with one of us first!

---

# Fin

Enjoy the workshop!
