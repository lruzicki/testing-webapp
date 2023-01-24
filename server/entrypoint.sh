#!/bin/sh
RESULTS_FILE=results/${RESULT_NAME}.message
EXPORT_SCRIPT="${EXPORT_SCRIPT_PAT:-docker/export_to_mongo.sh}"
API_HEALTHCHECK_RETRIES=60
API_HEALTHCHECK_INTERVAL=2

show_help() {
  echo """
  Commands
  ---------------------------------------------------------------

  dev                : Run express.js server using nodemon
  prod               : Run express.js server using node

  """
}

healthcheckApiCall() {
    echo "Sending test request, result:"
    echo "-----"
    curl ${API_URL}
    RETURN=$?
    if [ $RETURN -eq 7 ];
    then
      echo "Api healthcheck call failed, curl returned status code 7"
      return 1
    fi
    echo "-----"
    echo "Success in calling healtcheck API endpoint"
    return 0
}


case "$1" in
  "dev" )
    yarn dev
  ;;
  "prod" )
    yarn prod
  ;;
  * )
    show_help
  ;;
esac
