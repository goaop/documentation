.. index::
   single: About Aspect Oriented programming (AOP)

Introduction to AOP
===================

.. toctree::
   :maxdepth: 1

   glossary.rst
   types_of_advices.rst

The motivation for Go! (and likewise for aspect-oriented programming) is the realization that there are issues or
concerns that are not well captured by traditional programming methodologies. Consider the problem of enforcing a
security policy in some application. By its nature, security cuts across many of the natural units of modularity of
the application. Moreover, the security policy must be uniformly applied to any additions as the application evolves.
And the security policy that is being applied might itself evolve. Capturing concerns like a security policy in a
disciplined way is difficult and error-prone in a traditional programming language.

Concerns like security cut across the natural units of modularity. For PHP the natural unit of modularity is the class.
But in PHP crosscutting concerns are not easily turned into classes precisely because they cut across classes,
and so these aren’t reusable, they can’t be refined or inherited, they are spread through out the program in an
undisciplined way, in short, they are difficult to work with.