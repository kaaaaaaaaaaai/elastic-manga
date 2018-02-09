import pandas as pd
from pprint import pprint
from elasticsearch import Elasticsearch


def main():
    json = pd.read_json("./document.json")
    pprint(json["data"])

    es = Elasticsearch("http://localhost:9200")

    for data in json["data"].iteritems():
        pprint(data[1]["image_url"])
        d = {
		"image_url":data[1]["image_url"],
		"tags": data[1]["plane_tags"],
                "plane_tags": data[1]["plane_tags"]
        }
        pprint(es.index(index="prod", doc_type="image", body=d))



if __name__ == '__main__':
    main()
