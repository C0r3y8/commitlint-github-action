const core = require('@actions/core')

const resultsOutputId = 'results'

const mapMessageValidation = item => item.message

const mapResultOutput = ({
  hash,
  lintResult: { valid, errors, warnings, input },
}) => ({
  hash,
  message: input,
  valid,
  errors: errors.map(mapMessageValidation),
  warnings: warnings.map(mapMessageValidation),
})

const generateOutputs = ({
  changelog,
  formattedResults,
  formattedTitleResults,
  lintedCommits,
  lintedTitle,
}) => {
  const resultsOutput = {
    changelog: changelog,
    formattedResults: formattedResults,
    formattedTitleResults: formattedTitleResults,
    json: lintedTitle.concat(lintedCommits).map(mapResultOutput),
  }

  core.setOutput(resultsOutputId, resultsOutput)
}

module.exports = generateOutputs
