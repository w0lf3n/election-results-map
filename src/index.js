
// use colors     	FF9933	003399	99CCCC	CCCCCC
// https://www.colorcombos.com/color-schemes/89/ColorCombo89.html

// http://opendatalab.de/projects/geojson-utilities/
// https://gdz.bkg.bund.de/index.php/default/open-data.html
// https://data.opendatasoft.com/api/v2/console
// https://regionalatlas.statistikportal.de/#


import * as adjust from "./data/adjust.js";
import * as visualize from "./gui/visualize.js";
import {import_data_by_year, QUERY_TYPE} from "./data/import.js";
import {analyze} from "./data/analyze.js";
import {evaluate} from "./data/evaluate.js";


import_data_by_year(2005, {query: QUERY_TYPE.BACKUP})
    .then(data => analyze(data, {}))
    .then(results => {

        // bezeichnung -> name
        // adjust.replace_keys(results)

        // adjust.replace_keys(results.votings, "stadtbereich_code:code", "stadtbereich_bezeichnung:bezeichnung");
        // adjust.restructure()
        // adjust.replace_keys(results.population, "stadtbereich_code:code", "stadtbereich_bezeichnung:bezeichnung");

        return results;
    })
    .then(results => evaluate(results, {}))
    .then(results => {

        visualize.init();

        visualize.set_key_mapping("code:id", "bezeichnung:name");

        visualize.add_data_map(results.city_district);
        visualize.add_data_map(results.federal_state);
        visualize.add_data_map(results.country);

    });
