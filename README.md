# ISZ/PS - Project Management System

### Setup okruzenja (front + back + db)
- *todo*

### Napomene (frontend)
- Za setapovanje **lokalnog frontenda** (van repozitorijuma, zbog razvoja sa hotreloadingom):
 
```bash
npm init solid@latest 
# bilo koje ime
# solid-start project: yes
# use typescript: no
# template: with-tailwindcss
```
- prekopirati `./frontend/tailwind.config.cjs` u svoj lokalni folder (*zbog palete boja*)
- (opcionalno) prekopirati
- dodavanje ruta ide sledece (`./frontend/components/routing/PMSRouter.jsx`)
```html
<Router>
  ...
  <!-- Preporuceno tab autokompletiranje pri dodavanju komponenti zbog automatskog importovanja -->
  <Route path="/ruta..." component={Komponenta}/>
</Router>
``` 
- ... i rute rade
- **lokalni** server pokretati preko `npm run dev`, a Dockerizovanu aplikaciju preko `docker-compose up --build -d`