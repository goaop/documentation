.. index::
   single: Types of advices

Types of advices
================

Before advice

Advice that executes before a join point, but which does not have the ability to prevent execution flow proceeding to
the join point (unless it throws an exception).

After returning advice

Advice to be executed after a join point completes normally: for example, if a method returns without throwing an
exception.

After throwing advice

Advice to be executed if a method exits by throwing an exception.

After (finally) advice

Advice to be executed regardless of the means by which a join point exits (normal or exceptional return).

Around advice

Advice that surrounds a join point such as a method invocation. This is the most powerful kind of advice.
Around advice can perform custom behavior before and after the method invocation. It is also responsible for choosing
whether to proceed to the join point or to shortcut the advised method execution by returning its own return value or
throwing an exception.