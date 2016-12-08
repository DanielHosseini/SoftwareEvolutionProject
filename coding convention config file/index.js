'use strict'

module.exports = {
  globals: {
    angular: true
  },
  plugins: [
    'angular'
  ],
  rules: {
    'angular/controller-as': 2,
    'angular/controller-as-vm': [2, 'vm'],
    'angular/controller-name': [2, '/[A-Z].*Controller$/'],
    'angular/di': [2, 'function'],
    'angular/di-order': [0, true],
    'angular/directive-name': 0,
    'angular/document-service': 2,
    'angular/file-name': 0,
    'angular/filter-name': 0,
    'angular/function-type': 0,
    'angular/log': 2,
    'angular/module-getter': 2,
    'angular/module-name': 0,
    'angular/module-setter': 2,
    'angular/no-service-method': 2,
    'angular/service-name': 2
  }
}
