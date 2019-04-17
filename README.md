```graphql
# Write your query or mutation here
# subscription {
#   pane(where: { node: { viewer: { id: "cjte19wpla9ws0b514gpr94k6" } } }) {
#     node {
#       id
#       rowStart
#       rowSpan
#       colStart
#       colSpan
#       content {
#         title
#         url
#       }
#     }
#   }
# }

mutation UpdatePane {
  updatePane(
    where: { id: "cjte19wpca9wp0b519p1ah8q5" }
    data: { rowSpan: 1, colSpan: 1 }
  ) {
    rowStart
    rowSpan
    colStart
    colSpan
  }
}

query GetViewer {
  viewer(where: { name: "andy's laptop" }) {
    id
    activePanes {
      id
      rowStart
      rowSpan
      colStart
      colSpan
      content {
        title
        url
      }
    }
  }
}
```