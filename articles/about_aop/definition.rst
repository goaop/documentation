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

