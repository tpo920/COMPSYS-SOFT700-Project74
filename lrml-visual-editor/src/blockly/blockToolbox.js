import '@blockly/toolbox-search';

export const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'If',
      colour: '#8AB2FF',
      contents: [ 
        // Add blocks relevant to "If" category here
        {
          kind: 'block',
          type: 'if_block',
        },
        {
          kind: 'block',
          type: 'then_block',
        }
      ],
    },
    {
      kind: 'category',
      name: 'Operators',
      colour: '#FF8A8A',
      contents: [
        // Add blocks relevant to "Operators" category here
        {
          kind: 'block',
          type: 'and_block',
        },
        {
          kind: 'block',
          type: 'or_block',
        },
        {
          kind: 'block',
          type: 'not_block',
        },
        {
          kind: 'block',
          type: 'operator_block',
        },
      ],
    },
    {
      kind: 'category',
      name: 'Expression',
      colour: '#3e4772',
      contents: [
        // Add blocks relevant to "Expression" category here
        {
          kind: 'block',
          type: 'expr_block',
        },
      ],
    },
    {
      kind: 'category',
      name: 'Atom',
      colour: '#D7ABE2',
      contents: [
        // Add blocks relevant to "Atom" category here
        {
          kind: 'block',
          type: 'atom_block',
        },
        {
          kind: 'block',
          type: 'fun_block',
        },
        {
          kind: 'block',
          type: 'rel_block',
        },
        {
          kind: 'block',
          type: 'var_block',
        },
      ],
    },
    {
      kind: 'category',
      name: 'Data',
      colour: '#66BB6A',
      contents: [
        // Add blocks relevant to "Data" category here
        {
          kind: 'block',
          type: 'data_block'
        },
      ],
    },
    {
      kind: 'category',
      name: 'Deontic',
      colour: '#EB9B34',
      contents: [ 
        // Add blocks relevant to "Deontic" category here
        {
          kind: 'block',
          type: 'obligation_block',
        },
        {
          kind: 'block',
          type: 'permission_block',
        },
        {
          kind: 'block',
          type: 'prohibition_block',
        },
      ],
    },
    {
      kind: 'category',
      name: 'Statement',
      colour: '#5ba59f',
      contents: [ 
        // Add blocks relevant to "Deontic" category here
        {
          kind: 'block',
          type: 'appliedstatement_block',
        },
        {
          kind: 'block',
          type: 'rulestatement_block',
        },
      ],
    },
    {
      kind: "category",
      name: "Dynamic Category",
      custom: "DYNAMIC_CATEGORY",
      contents: []
    },
    {
      kind: "category",
      name: "Test Category",
      contents: [
        // {
        //   kind: 'block',
        //   type: 'if_block',
        //   inputs: {
        //     MEMBER_IF: {
        //       block: {
        //         type: 'and_block',
        //         inputs: {
        //           MEMBER_AND: {
        //             block: {
        //               type: 'expr_block',
        //               inputs: {
        //                 MEMBER_EXPRESSION: {
        //                   block: {
        //                     type: 'fun_block',
        //                     fields: {
        //                       MEMBER_FUNCTION: 'has',
        //                     }
        //                   }
        //                 }
        //               }
        //             }
        //           }
        //         }
        //       }
        //     }
        //   }
        // }
        {
          "kind": "block",
          "type": "if_block",
          "fields": {},
          "inputs": {
              "MEMBER_IF": {
                  "block": {
                      "kind": "block",
                      "type": "and_block",
                      "fields": {},
                      "inputs": {
                          "MEMBER_AND": {
                              "block": {
                                  "kind": "block",
                                  "type": "expr_block",
                                  "fields": {},
                                  "inputs": {
                                      "MEMBER_EXPRESSION": {
                                          "block": {
                                              "kind": "block",
                                              "type": "fun_block",
                                              "fields": {
                                                  "MEMBER_FUNCTION": "has"
                                              }
                                          }
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
          }
      }
      ]
    },
    {
      kind: 'sep',
    },
    {
      'kind': 'search',
      'name': 'Search',
      'contents': [],
    },
  ],
};
