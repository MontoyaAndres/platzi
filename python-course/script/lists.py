def lists():
    # https://platzi.com/clases/1378-python/14164-uso-de-listas/
    countries = ["Colombia", "Ecuador", "Brasil", "Honduras"]
    # No hacer, porque si cambia el valor de `countries`, global_countries también cambia
    # global_countries = countries
    # Manera recomendada
    global_countries = copy.copy(countries)
    countries[0] = "Venezuela"
    print(countries, global_countries)


if __name__ == "__main__":
    lists()

