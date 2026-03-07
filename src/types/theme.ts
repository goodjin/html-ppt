export interface ThemeColors {
  primary: string
  secondary: string
  background: string
  text: string
  accent: string
}

export interface ThemeFonts {
  heading: string
  body: string
  code: string
}

export interface ThemeStyles {
  colors: ThemeColors
  fonts: ThemeFonts
}

export interface Theme {
  id: string
  name: string
  type: 'preset' | 'custom'
  styles: ThemeStyles
}

// Default preset themes
export const presetThemes: Theme[] = [
  {
    id: 'black',
    name: '经典黑',
    type: 'preset',
    styles: {
      colors: {
        primary: '#ffffff',
        secondary: '#cccccc',
        background: '#000000',
        text: '#ffffff',
        accent: '#4a90d9'
      },
      fonts: {
        heading: 'Helvetica, Arial, sans-serif',
        body: 'Helvetica, Arial, sans-serif',
        code: 'Monaco, Menlo, monospace'
      }
    }
  },
  {
    id: 'white',
    name: '简约白',
    type: 'preset',
    styles: {
      colors: {
        primary: '#333333',
        secondary: '#666666',
        background: '#ffffff',
        text: '#333333',
        accent: '#4a90d9'
      },
      fonts: {
        heading: 'Helvetica, Arial, sans-serif',
        body: 'Helvetica, Arial, sans-serif',
        code: 'Monaco, Menlo, monospace'
      }
    }
  },
  {
    id: 'league',
    name: '商务蓝',
    type: 'preset',
    styles: {
      colors: {
        primary: '#ffffff',
        secondary: '#e0e0e0',
        background: '#1a1a2e',
        text: '#ffffff',
        accent: '#4a90d9'
      },
      fonts: {
        heading: 'Georgia, serif',
        body: 'Helvetica, Arial, sans-serif',
        code: 'Monaco, Menlo, monospace'
      }
    }
  },
  {
    id: 'night',
    name: '夜间模式',
    type: 'preset',
    styles: {
      colors: {
        primary: '#ffffff',
        secondary: '#aaaaaa',
        background: '#111111',
        text: '#eeeeee',
        accent: '#f0ad4e'
      },
      fonts: {
        heading: 'Helvetica, Arial, sans-serif',
        body: 'Helvetica, Arial, sans-serif',
        code: 'Monaco, Menlo, monospace'
      }
    }
  },
  {
    id: 'dracula',
    name: 'Dracula',
    type: 'preset',
    styles: {
      colors: {
        primary: '#ffffff',
        secondary: '#bd93f9',
        background: '#282a36',
        text: '#f8f8f2',
        accent: '#ff79c6'
      },
      fonts: {
        heading: 'Helvetica, Arial, sans-serif',
        body: 'Helvetica, Arial, sans-serif',
        code: 'Monaco, Menlo, monospace'
      }
    }
  }
]
