## Anodized TSX

> ! Still in development until version 1.1 (Meaning any 1.0.* variants won't be production safe!)

Want to use TSX syntax on your controllers with zero overhead and an infinitesimally lower amount of dependencies? Anodized's TSX module is very small, has 0 dependencies (other than typescript, but anodized is based on typescript). 

To make your application tsx ready, simply type the command:
```bash
npx anodized-tsx init
```

This will correctly configure your tsconfig to support TSX and decorators
```jsx
import { Controller, Get } from '@anodized/http';
import { AnodizedTSX } from '@anodized/tsx' // needed for JSX transformation.

@Controller()
class HomepageController
{
    @Get({ path: '/', produces: 'text/html' })
    public showHomepage()
    {
        return (
            <div className='homepage'>
                <p>Hello World</p>
                <button
                    onClick={() => alert('Hello World')}
                >Click me</button>
            </div>
        );
    }

}
```

Upon running the application and heading to the web address you're hosting on, you should see this dom structure mirrored on the frontend!