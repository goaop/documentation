.. index::
   single: Understanding aspects

Understanding aspects
=====================

In order to understand aspects, we have to go back to fundamental concept of modularity in programming, that is, appliance
of *divide at impera* strategy, which helps us to split complex problems to smaller ones and solve them as such, one by one.

Every programing paradigm defines modularity differently.

For procedural programing languages, fundamental unit of modularity is one single procedure, that is, complex
problem is broken down to smaller, simpler ones, and each procedure should solve such smaller sub-problem. Same goes to
functional programing languages, unit of modularity for functional languages is function.

Following same logic, it can be deducted that unit of modularity for object oriented languages is a class. Although such
statement can be subject of argument (since class can consist of several methods, solving various problems in same time),
in ideal world following `Single responsibility principle`_ a class methods will be organized around single sub-problem.

.. _Single responsibility principle: https://en.wikipedia.org/wiki/Single_responsibility_principle

In aspect oriented programing paradigm, aspect is unit of modularity. As in above mentioned, aspect suppose to solve one
simple sub-problem. The difference is in the way how aspect approaches to the subject. Namely, aspect oriented programing
defines a `cross-cutting concerns`_.

    In aspect-oriented software development, cross-cutting concerns are aspects of a program that affect other concerns.
    These concerns often cannot be cleanly decomposed from the rest of the system in both the design and implementation,
    and can result in either scattering (code duplication), tangling (significant dependencies between systems), or both.

    -- From Wikipedia

.. _cross-cutting concerns: https://en.wikipedia.org/wiki/Cross-cutting_concern
