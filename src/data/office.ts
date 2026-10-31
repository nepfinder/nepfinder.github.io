/** Layout data for the 3D "AI office" hero scene. Grid cells are 3.2 units apart; the ERP server sits at (0, 0). */
export interface Department {
  key: string
  name: string
  col: -1 | 0 | 1
  row: -1 | 0 | 1
  color: string
}

export const departments: Department[] = [
  { key: 'accounting', name: 'Accounting', col: -1, row: -1, color: '#0071E3' },
  { key: 'inventory', name: 'Inventory', col: 0, row: -1, color: '#1D1D1F' },
  { key: 'procurement', name: 'Procurement', col: 1, row: -1, color: '#2997FF' },
  { key: 'finance', name: 'Finance', col: -1, row: 0, color: '#5E5CE6' },
  { key: 'operations', name: 'Operations', col: 1, row: 0, color: '#424245' },
  { key: 'sales', name: 'Sales', col: -1, row: 1, color: '#0071E3' },
  { key: 'crm', name: 'CRM', col: 0, row: 1, color: '#1D1D1F' },
  { key: 'hr', name: 'Human Resources', col: 1, row: 1, color: '#2997FF' },
]

/** Department names in the order used by the static fallback graphic and its Nepali translation. */
export const heroModules = ['Finance', 'Accounting', 'Inventory', 'Sales', 'Procurement', 'CRM', 'Human Resources', 'Operations']
