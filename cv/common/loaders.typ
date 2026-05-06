// Shared YAML loading + variant-filter helpers.
//
// Every variant-scoped entry in data/*.yaml carries an `include_in` list,
// e.g. `include_in: [academic, casual]`. Renderers filter entries via
// `load-yaml-list(path, variant)`.
//
// Fields that differ between the two CVs use a per-variant suffix:
// `dates` is the academic-canonical value; `dates_casual` overrides it.
// Renderers fetch these via `field(item, "dates", variant)`.

#let load-yaml-list(path, variant) = {
  yaml(path).filter(e => variant in e.at("include_in", default: (variant,)))
}

#let field(item, key, variant) = {
  item.at(key + "_" + variant, default: item.at(key, default: none))
}

// Same filter semantics as `load-yaml-list`, applied to an item's bullets.
// Bullets without an explicit `include_in` default to all variants.
#let bullets-for(item, variant) = {
  item.at("bullets", default: ()).filter(b => variant in b.at("include_in", default: (variant,)))
}
