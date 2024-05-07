import boringcalculator as bc
import sympy as sp
import numpy as np


def _calculate(
    user_input: str, latex=False, pretty=False, function: str = None, extras=[]
):
    expr = bc.BasicOperationProcessor(user_input)
    if function:
        expr.executeTask(function)
        for i in extras:
            expr.executeTask(i)
    else:
        expr.fullCompute(parallel=False)
    results = expr.results
    for k, v in results.items():
        if isinstance(v, tuple):
            v = list(v)
            for i, j in enumerate(v):
                if latex:
                    v[i] = bc.parsing.tomathjax(j)
                elif pretty:
                    v[i] = bc.parsing.pretty(j)
                else:
                    v[i] = str(j)
        else:
            if latex:
                v = bc.parsing.tomathjax(v)
            elif pretty:
                v = bc.parsing.pretty(v)
            else:
                v = str(v)
        if function and not extras:
            results = {k: v}
            break
        results[k] = v

    return results


def withoutRender(text: str):
    return text + "\\doNotRenderAsTEX"


def is_linearly_independent(vectors: list):
    try:
        res = "independientes" if _is_linearly_independent(vectors) else "dependientes"
        return (
            bc.parsing.tomathjax("Los vectores:")
            + format_vectors(vectors)
            + bc.parsing.tomathjax(" son linealmente ")
            + bc.parsing.tomathjax(res)
        )

    except np.linalg.LinAlgError:
        return withoutRender(
            "La matriz debe ser cuadrada para poder determinar un resultado (n x n)"
        )
    except ValueError:
        return withoutRender(
            "La matriz introducida tiene una cantidad no homogénea de submatrices, por favor revisa que todos los vectores tengan la misma cantidad de submatrices"
        )


def _is_linearly_independent(vectors: list):
    return sp.Matrix(vectors).det() != 0


def find_scalars(vectors: list, target: list):
    try:
        res = _find_scalars(vectors, target)
        return (
            bc.parsing.tomathjax("Los vectores:")
            + format_vectors(vectors)
            + bc.parsing.tomathjax(" pueden ser combinados con los escalares:")
            + format_vectors(res)
            + bc.parsing.tomathjax(" para obtener el vector:")
            + format_vectors([target])
        )
    except np.linalg.LinAlgError:
        return withoutRender(
            "La matriz debe ser cuadrada para poder determinar un resultado (n x n)"
        )
    except ValueError:
        return withoutRender(
            "La matriz introducida tiene una cantidad no homogénea de submatrices, por favor revisa que todos los vectores tengan la misma cantidad de submatrices"
        )


def _find_scalars(vectors: list, target: list):
    vm, VM = sp.Matrix(vectors), sp.Matrix(target)
    return vm.transpose().solve(VM)


def format_vectors(vectors: list | sp.Matrix):
    if isinstance(vectors, sp.Matrix):
        vectors = vectors.tolist()
    separator = ","
    if len(vectors) > 2:
        separator = ",\\newline "
    return (
        "\\newline "
        + separator.join(
            (
                bc.parsing.tomathjax(
                    sp.Eq(
                        sp.symbols(f"v_{i}"),
                        sp.Matrix(v).transpose(),
                        evaluate=False,
                    )
                )
                for i, v in enumerate(vectors)
            )
        )
        + "\\newline "
    )


def nothing():
    pass
