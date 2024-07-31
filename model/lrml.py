"""
Title: <lrml-editor/lrml.py>
Author: Fuchs, S
Availability: https://github.com/stefan-1992/lrml-editor

All rights belong to the original author
"""


import re
from anytree import Node, PreOrderIter, findall
import copy

def parse_to_tree(lrml: str):
    node_id = -1
    root_node = Node('root', node_id=node_id)
    new_node = None
    current_node = root_node
    current_word = ''
    quote = False
    for i in lrml:
        if i == "'":
            quote = not quote
            current_word += i
        elif not quote and (i == '(' or i == ')' or i == ','):
            if current_word:
                node_id += 1
                new_node = Node(current_word, current_node, node_id=node_id)
                current_word = ''
            if i == '(' and new_node is not None:
                current_node = new_node
            elif i == ')' and current_node.parent is not None:
                current_node = current_node.parent
        else:
            current_word += i
    if current_node == root_node and current_word:
        node_id += 1
        new_node = Node(current_word, current_node, node_id=node_id)
    return root_node


def node_to_lrml(node, stop_node=None, separator=','):
    initial_depth = node.depth
    last_depth = -1
    lrml = ''
    for i in PreOrderIter(node):
        if i.depth > last_depth:
            if last_depth != -1:
                lrml += '('
        else:
            last_depth - i.depth
            lrml += ')' * (last_depth - i.depth)
            lrml += separator
        if stop_node is not None and i.node_id == stop_node.node_id:
            break
        lrml += i.name
        last_depth = i.depth
    #   Only add brackets for full print
    if stop_node is None:
        lrml += ')' * (last_depth - initial_depth)
    #   Remove root node
    if node.is_root:
        lrml = lrml.replace('root(', '')
        if stop_node is None:
            lrml = lrml[:-1]
    return lrml


def swap_lrml_nodes(text):
    print(text)
    node = parse_to_tree(text.replace(' ', '').replace('\n', '').strip())
    and_or_node = findall(node, filter_=lambda x: (
        (x.name == 'and') | (x.name == 'or')))

    new_and_or_node = Node(and_or_node[0].name)
    print(new_and_or_node)
    new_and_or_node.children = [i.children[0] for i in and_or_node[0].children]
    and_or_node[0].name = and_or_node[0].children[0].name

    and_or_node[0].children = [new_and_or_node]
    return node_to_lrml(and_or_node[0])


abbr_mapping = {'metre': 'm', 'gram': 'g', 'litre': 'l', 'newton': 'N',
                'pascal': 'Pa', 'angleDegree': 'deg', 'celsius': 'degC', 'hectare': 'ha'}
abbr_mapping_prefixes = {'kilo': 'k', 'milli': 'm', 'mega': 'M'}
opperator_mapping = {'addition': '+', 'subtraction': '-',
                     'multiplication': '*', 'division': '/'}

regex = r'(?<!\w)(\d+\.?\d*)\s([a-zA-Z0-9/*+-]+)(?!\w)'


def reverse_baseunit(value, prefix):
    if not value:
        return None
    base_unit = Node(name=prefix + 'baseunit')
    exp = None
    prefix_node = None
    kind = None
    # Ends with number -> exponent
    if re.search(r'\d+$', value):
        exp = Node(name=prefix + 'exponent')
        Node(name=prefix + value[-1] + '.0', parent=exp)
        value = value[:-1]
    # Ends with abbr -> kind
    for abbr, unit in reversed(abbr_mapping.items()):
        if value.endswith(unit):
            kind = Node(name=prefix + 'kind')
            Node(name=prefix + abbr, parent=kind)
            value = value[:-len(unit)]
            break
    # Remainder -> prefix
    for abbr, unit in reversed(abbr_mapping_prefixes.items()):
        if value == unit:
            prefix_node = Node(name=prefix + 'prefix')
            Node(name=prefix + abbr, parent=prefix_node)
            value = ''
            break

    base_unit.children = [i for i in [exp, prefix_node, kind] if i]

    if value != '':
        return None
    return base_unit


def reverse_unit_string(data_value, prefix=' '):
    data_value = data_value.strip()
    if len(data_value.split(' ')) == 2 and not data_value.split(' ')[0].isalpha():
        number = data_value.split(' ')[0]
        unit = data_value.split(' ')[1]
        unit_node = None
        # Derived Unit
        for operator_name, operator in opperator_mapping.items():
            split_unit = unit.split(operator)
            if len(split_unit) == 2:
                first_unit = reverse_baseunit(split_unit[0], prefix=prefix)
                second_unit = reverse_baseunit(
                    split_unit[1], prefix=prefix)
                operator = Node(name=prefix + 'operator')
                name_node = Node(name=prefix + 'name', parent=operator)
                Node(name=operator_name, parent=name_node)
                if first_unit and second_unit:
                    unit_node = Node(name=prefix + 'derivedunit', children=[
                        first_unit, operator, second_unit])
                break
        # Base unit
        if not unit_node:
            unit_node = reverse_baseunit(unit, prefix=prefix)

        if unit_node:
            value_node = Node(name=prefix + 'value')
            if not '.' in number:
                number += '.0'

            Node(name=prefix + number, parent=value_node)
            data_node = Node(name=prefix + 'data',
                             children=[unit_node, value_node])
            return node_to_lrml(data_node)

    return data_value


def capitalize_or_underscore(text):
    # if text[0].isalpha():
    if text.isalpha():
        return text.capitalize()
    return '_' + text


def make_camel_case(text):
    text = ''.join([capitalize_or_underscore(j)
                   for j in text.strip().split(' ')])
    if text.startswith('_'):
        text = text[1:]
    text = text[0].lower() + text[1:]
    return text

# Remove space


def revert_tree_based_spacing(lrml):
    tree = parse_to_tree(lrml)
    for i in PreOrderIter(tree):
        if i.children:
            # Make Camel case except first word
            i.name = make_camel_case(i.name)
        else:
            if i.parent.name.strip() not in ['and', 'or'] and (not i.siblings or i.siblings[0].node_id > i.node_id):
                i.name = '.'.join([make_camel_case(i)
                                  for i in i.name.split('.')])
            else:
                if i.name.strip() != reverse_unit_string(i.name.strip()) or i.name.strip().startswith("'"):
                    i.name = i.name.strip()
                else:
                    i.name = make_camel_case(i.name)

    return node_to_lrml(tree).strip()


def fix_then(lrml, prefix):
    tree = parse_to_tree(lrml)
    if len(tree.children) == 1:
        thens = findall(tree, filter_=lambda x: ((x.name == prefix + 'then')))
        if len(thens) > 0:
            thens[0].parent = tree
    return node_to_lrml(tree)


def add_space_after_comma(lrml: str):
    tree = parse_to_tree(lrml)
    return node_to_lrml(tree, separator=', ')

def str2bool(v):
    return v.lower() in ("yes", "true", "t", "1")


def reverse_move_and_or_to_data_node(lrml):
    tree = parse_to_tree(lrml)
    and_nodes = findall(tree, filter_=lambda x: (
        (x.name.strip() == 'and') or (x.name.strip() == 'or')))
    for and_node in and_nodes:
        if and_node.parent.name.strip() == 'data':
            connector_name = and_node.name
            copyable_node = find_max_express_node(and_node)
            copied_nodes = []
            children = and_node.children
            data_node = and_node.parent
            and_node.parent = None
            for index, child in enumerate(children):
                new_node = copy.deepcopy(copyable_node)
                child.parent = findall(
                    new_node, filter_=lambda x: str(x) == str(data_node))[0]
                new_node.node_id += index
                copied_nodes.append(new_node)

            parent_node = copyable_node.parent
            if parent_node:
                if parent_node.name.strip() == connector_name.strip():
                    increase_indices(copyable_node.siblings,
                                     copyable_node.node_id, len(children))
                    parent_node.children = parent_node.children[:copyable_node.node_id] + tuple(
                        copied_nodes) + parent_node.children[copyable_node.node_id:]
                    sort_children(parent_node)
                else:
                    connector_node = Node(
                        connector_name, parent=parent_node, node_id=copyable_node.node_id)
                    connector_node.children = copied_nodes
                    sort_children(connector_node.parent)
                copyable_node.parent = None

    return node_to_lrml(tree)


keywords = ['if', 'then', 'and', 'or', 'obligation', 'permission', 'prohibition', 'not', 'expression', 'appliedstatement', 'rulestatement',
            'atom', 'function', 'relation', 'variable', 'data', 'baseunit', 'derivedunit', 'prefix', 'kind', 'operator', 'value']

# This function tries to revert the simplified LRML back to the original LRML by adding the missing keywords
# The first nodes that are no keywords are assumed to be expressions and the node names are the new functions of this expression
# For the children there are multiple possibilities: The first can be either an atom or a new expression. The second one, if available, is always a data node


def reverse_resolve_expressions(lrml, fix_errors, prefix=' '):
    tree = parse_to_tree(lrml)
    recusive_reverse_resolve_expressions(tree, fix_errors, prefix)
    return node_to_lrml(tree)


def recusive_reverse_resolve_expressions(node, fix_errors, prefix):
    for node in node.children:
        if node.name.strip() in keywords:
            recusive_reverse_resolve_expressions(
                node, fix_errors, prefix=prefix)
        else:
            make_expression(node, fix_errors, prefix=prefix)


def make_expression(node, fix_errors, prefix):
    expr = Node(prefix + 'expression',
                parent=node.parent, node_id=node.node_id)
    fun = Node(prefix + 'function', parent=expr, node_id=node.node_id)
    node.parent = fun
    children = node.children
    if children:
        if children[0].children:
            children[0].parent = expr
            make_expression(children[0], fix_errors, prefix=prefix)
        else:
            atom = Node(prefix + 'atom', parent=expr,
                        node_id=children[0].node_id)
            children[0].parent = atom
        if len(children) > 1:
            if children[1].name.strip() == 'data':
                children[1].parent = expr
            else:
                data = Node(prefix + 'data', parent=expr,
                            node_id=children[1].node_id)
                children[1].parent = data
        if node.children:
            if fix_errors:
                for child in node.children:
                    child.parent = None
        sort_children(expr)
        sort_children(expr.parent)
    else:
        print('ERROR: No children for expression', node_to_lrml(node.root))


def reverse_combine_rel_and_var(lrml, prefix=' '):
    tree = parse_to_tree(lrml)
    atom_node = findall(tree, filter_=lambda x: (
        x.name == prefix + 'atom' in str(x)))

    for i in atom_node:
        if i.children:
            nodes = re.split(
                '(?=[a-z' + prefix + '])\.|\.(?=[a-z' + prefix + '])', i.children[0].name)
            if len(nodes) > 1:
                rel = nodes[1]
                rel_node = Node(name=prefix + 'relation', parent=i)
                Node(name=rel, parent=rel_node)
            var = nodes[0]
            var_node = Node(name=prefix + 'variable', parent=i)
            Node(name=var, parent=var_node)
            i.children[0].parent = None

    return node_to_lrml(tree)


def reverse_loop(lrml, prefix=' '):
    tree = parse_to_tree(lrml)
    hierarchy = ['rulestatement', 'appliedstatement']
    loop_node = findall(tree, filter_=lambda x: (
        x.name == prefix + 'loop' in str(x)))
    for i in loop_node:
        i.name = prefix + 'expression'
        for index, j in enumerate(i.children):
            if index > 1:
                print('ERROR in reverse loop:', [
                      node_to_lrml(i) for i in i.children])
                break
            node = Node(prefix + hierarchy[index], parent=i, node_id=j.node_id)
            j.parent = node
            sort_children(i)

    return node_to_lrml(tree)


regex = r'(?<!\w)(\d+\.?\d*)\s([a-zA-Z0-9/*+-]+)(?!\w)'


def reverse_baseunit(value, prefix):
    if not value:
        return None
    base_unit = Node(name=prefix + 'baseunit')
    exp = None
    prefix_node = None
    kind = None
    # Ends with number -> exponent
    if re.search(r'\d+$', value):
        exp = Node(name=prefix + 'exponent')
        Node(name=prefix + value[-1] + '.0', parent=exp)
        value = value[:-1]
    # Ends with abbr -> kind
    for abbr, unit in reversed(abbr_mapping.items()):
        if value.endswith(unit):
            kind = Node(name=prefix + 'kind')
            Node(name=prefix + abbr, parent=kind)
            value = value[:-len(unit)]
            break
    # Remainder -> prefix
    for abbr, unit in reversed(abbr_mapping_prefixes.items()):
        if value == unit:
            prefix_node = Node(name=prefix + 'prefix')
            Node(name=prefix + abbr, parent=prefix_node)
            value = ''
            break

    base_unit.children = [i for i in [exp, prefix_node, kind] if i]

    if value != '':
        return None
    return base_unit


def reverse_units(lrml, prefix=' '):
    tree = parse_to_tree(lrml)
    data_nodes = findall(tree, filter_=lambda x: ((x.name.strip() == 'data')))
    for i in data_nodes:
        data_value = i.leaves[0].name.strip()
        if re.match(regex, data_value):
            if len(data_value.split(' ')) > 2:
                continue
            number = data_value.split(' ')[0]
            unit = data_value.split(' ')[1]
            unit_node = None
            # Derived Unit
            for operator_name, operator in opperator_mapping.items():
                split_unit = unit.split(operator)
                if len(split_unit) == 2:
                    first_unit = reverse_baseunit(split_unit[0], prefix=prefix)
                    second_unit = reverse_baseunit(
                        split_unit[1], prefix=prefix)
                    operator = Node(name=prefix + 'operator')
                    name_node = Node(name=prefix + 'name', parent=operator)
                    Node(name=operator_name, parent=name_node)
                    if first_unit and second_unit:
                        unit_node = Node(name=prefix + 'derivedunit', children=[
                                         first_unit, operator, second_unit])
                    break
            # Base unit
            if not unit_node:
                unit_node = reverse_baseunit(unit, prefix=prefix)

            if unit_node:
                value_node = Node(name=prefix + 'value')
                if not '.' in number:
                    number += '.0'

                Node(name=prefix + number, parent=value_node)
                i.children = [unit_node, value_node]

    return node_to_lrml(tree)



def get_leave_names_from_node(node):
    return [i.name for i in node.leaves]


def sort_children(node):
    node.children = sorted(node.children, key=lambda item: item.node_id)


def find_max_express_node(node, include_deonitics=True):
    outside_options = ['not', 'expression', 'expr']
    if include_deonitics:
        outside_options += ['obligation', 'permission', 'prohibition']
    first_apearance = node.name.strip() in outside_options
    current_apperance = node.name.strip() in outside_options
    while node.parent:
        first_apearance += node.parent.name.strip() in outside_options
        current_apperance = node.parent.name.strip() in outside_options
        if node and (not first_apearance or (first_apearance and current_apperance)):
            node = node.parent
        else:
            break
    return node


def increase_indices(nodes, start_index, increase):
    for node in nodes:
        if node.node_id >= start_index:
            node.node_id += increase