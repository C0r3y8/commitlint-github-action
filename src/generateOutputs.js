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

const generateOutputs = (lintedCommits, comment, changelog) => {
  const resultsOutput = {
    changelog: '',
    comment: '',
    json: lintedCommits.map(mapResultOutput),
  }

  core.setOutput(resultsOutputId, resultsOutput)
}

module.exports = generateOutputs
