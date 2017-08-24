Definition
==========

From Wikipedia:

   Aspect-oriented programming (AOP) is a programming paradigm that aims to increase modularity by allowing the separation
   of cross-cutting concerns. It does so by adding additional behavior to existing code (an advice) without modifying the
   code itself, instead separately specifying which code is modified via a "pointcut" specification, such as "log all
   function calls when the function's name begins with 'set'". This allows behaviors that are not central to the business
   logic (such as logging) to be added to a program without cluttering the code, core to the functionality.

Definition introduces important term, a *cross-cutting concern*, which ought to be understood in order to proceed. In
that term, we have to define cross-cutting concern as well:

   Cross-cutting concerns are aspects of a program that affect other concerns. These concerns often cannot be cleanly
   decomposed from the rest of the system in both the design and implementation, and can result in either scattering
   (code duplication), tangling (significant dependencies between systems), or both.

Aspect-oriented programming aims to encapsulate cross-cutting concerns into aspects to retain modularity.

However, these academic definitions may confuse you, especially if you do not have previous experience with AOP. Fortunately,
they can be quite simplified and easily explained trough concepts with which you are already familiar with.

As previously stated in definition of aspect-oriented programming, final goal which ought to be achieved is increased
modularity. Modularity is the degree to which a system's components may be separated, recombined and reused. The very
origin of concept of modularity is old as civilisation itself. It is intellectual strategy as well on how to successfully
handle large problem: *divide et impera* (divide and conquer). In programing, we use this strategy all the time.

So, this problem solving strategy is familiar to every developer. However, various programing languages and their implemented
features provide us with various possibilities in modularization of our code. In procedural languages, fundamental unit of concern,
responsibility is one procedure. In functional, it is a function. In object oriented development, it is a class. In aspect
oriented development, unit of concern is one aspect.

Truth to be told, aspect oriented programming can not exists without functions, procedures, classes, methods, etc. It is
a complement to known programming paradigms. However, it requires different mindset, different approach when thinking about
software architecture and development problems.

If you are still confused about aspect oriented programming, no worries, read :doc:`next chapter<motivation_for_aop>`
which will gradually, trough examples, introduce you to problems and motivations for design of aspect oriented
programming and how aspect oriented programming handles those situations much better than known, usually used, tools and
techniques.

