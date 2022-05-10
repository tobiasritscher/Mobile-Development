module.exports = {
    preset: '@shelf/jest-mongodb',
    "reporters": [
        "default",
        ["./node_modules/jest-html-reporter", {
            "pageTitle": "Test Report"
        }]
    ]
};
